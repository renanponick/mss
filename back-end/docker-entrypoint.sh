#!/usr/bin/env bash

set -e

args=("$@")
this_script=$(basename "$0")

case $1 in
    start)
        exec node build/src/server.js
        ;;
    *)
        if [[ -n "$*" ]]; then
            exec "$*"
        else
            exec ./"$this_script" start
        fi
        ;;
esac