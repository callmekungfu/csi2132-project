FROM node:14-alpine
WORKDIR /usr/src/app

COPY package.json *yarn* ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 8000

CMD [ "yarn", "dev:docker" ]