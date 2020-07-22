FROM node:12.16.1

WORKDIR /usr/src/app

EXPOSE 3000
EXPOSE 3001

COPY package.json ./
COPY lerna.json ./
COPY yarn.lock ./
COPY packages/ packages

RUN yarn

RUN yarn build

CMD [ "yarn", "start" ]
