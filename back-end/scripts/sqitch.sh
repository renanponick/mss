#!/usr/bin/env bash
#
# This script was shamelessly copied from
# https://github.com/sqitchers/docker-sqitch/master/docker-sqitch.sh
# I also tweaked it a little (linting).
#
# More information at https://hub.docker.com/r/sqitch/sqitch/
#

# Determine which Docker image to run.
SQITCH_IMAGE=${SQITCH_IMAGE:=sqitch/sqitch:latest}

# Set up required pass-through variables.
user=${USER-$(whoami)}
passopt=(
    -e "SQITCH_ORIG_SYSUSER=$user"
    -e "SQITCH_ORIG_EMAIL=$user@$(hostname)"
    -e "TZ=$(date +%Z)" \
    -e "LESS=${LESS:--R}" \
)

# Handle OS-specific options.
case "$(uname -s)" in
    Linux*)
        passopt+=(-e "SQITCH_ORIG_FULLNAME=$(getent passwd "$user" \
            | cut -d: -f5 \
            | cut -d, -f1)")

        id_u=$(id -u "$user")
        id_g=$(id -g "$user")
        passopt+=(-u "$id_u":"$id_g")
        ;;
    Darwin*)
        passopt+=(-e "SQITCH_ORIG_FULLNAME=$(id -P "$user" \
            | awk -F '[:]' '{print $8}')")
        ;;
    MINGW*|CYGWIN*)
        passopt+=(-e "SQITCH_ORIG_FULLNAME=$(net user "$user")")
        ;;
    *)
        echo "Unknown OS: $(uname -s)"
        exit 2
        ;;
esac

# Iterate over optional Sqitch and engine variables.
for var in \
    SQITCH_CONFIG SQITCH_USERNAME SQITCH_PASSWORD SQITCH_FULLNAME SQITCH_EMAIL \
    SQITCH_TARGET DBI_TRACE PGUSER PGPASSWORD PGHOST PGHOSTADDR PGPORT \
    PGDATABASE PGSERVICE PGOPTIONS PGSSLMODE PGREQUIRESSL PGSSLCOMPRESSION \
    PGREQUIREPEER PGKRBSRVNAME PGKRBSRVNAME PGGSSLIB PGCONNECT_TIMEOUT \
    PGCLIENTENCODING PGTARGETSESSIONATTRS MYSQL_PWD MYSQL_HOST MYSQL_TCP_PORT \
    TNS_ADMIN TWO_TASK ORACLE_SID ISC_USER ISC_PASSWORD VSQL_HOST VSQL_PORT \
    VSQL_USER VSQL_PASSWORD VSQL_SSLMODE SNOWSQL_ACCOUNT SNOWSQL_USER \
    SNOWSQL_PWD SNOWSQL_HOST SNOWSQL_PORT SNOWSQL_DATABASE SNOWSQL_REGION \
    NOWSQL_WAREHOUSE
do
    if [ -n "${!var}" ]; then
       passopt+=(-e "$var")
    fi
done

# Determine the name of the container home directory.
homedst=/home
if [ "$(id -u "${user}")" -eq 0 ]; then
    homedst=/root
fi

if tty >> /dev/null; then
    passopt+=(-it)
fi

pwd=$(pwd)

# Run the container with the current and home directories mounted.
docker run --rm --network host \
    --mount "type=bind,src=$pwd,dst=/repo" \
    --mount "type=bind,src=$HOME,dst=$homedst" \
    "${passopt[@]}" "$SQITCH_IMAGE" "$@"
