FROM node:14-alpine

WORKDIR /usr/app/
COPY package.json yarn.lock ./

RUN yarn
RUN yarn global add serve

COPY . .

RUN yarn build

EXPOSE 3000
CMD ["yarn", "prod:start"]
