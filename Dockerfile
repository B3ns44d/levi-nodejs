FROM node:latest

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN npx prisma db push

EXPOSE 8082

VOLUME [ "/app/node_modules" ]


CMD ["yarn", "dev"]

