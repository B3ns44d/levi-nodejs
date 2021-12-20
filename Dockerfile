FROM node:latest

WORKDIR /app

COPY package.json .
COPY yarn.lock .


RUN yarn install

ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

COPY . .

RUN npx prisma db push
RUN npx prisma generate
EXPOSE 8082

VOLUME [ "/app/node_modules" ]



CMD ["yarn", "dev"]

