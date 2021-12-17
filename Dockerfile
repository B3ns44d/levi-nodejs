FROM node:latest

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 8082

VOLUME [ "/app/node_modules" ]

CMD ["yarn", "dev"]

