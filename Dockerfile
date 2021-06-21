FROM node:16-alpine

WORKDIR /app

COPY . /app/

RUN yarn install --frozen-lockfile
RUN yarn run bootstrap --ci
RUN yarn run build

EXPOSE 80

CMD [ "yarn", "run", "start"]