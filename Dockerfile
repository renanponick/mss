FROM node:12.16.3-alpine3.10

WORKDIR /app
ENV NODE_ENV production

COPY . ./

RUN apk --no-cache --virtual build-dependencies add \
    python3 \
    make \
    g++ \
    && NODE_ENV=development yarn --no-progress --non-interactive \
    && yarn build \
    && rm -rf node_modules \
    && yarn --no-progress --non-interactive \
    && rm -rf ~/.cache/yarn \
    && apk del build-dependencies

RUN apk --no-cache add bash

EXPOSE 8090

ENTRYPOINT [ "./docker-entrypoint.sh" ]
CMD ["start"]
