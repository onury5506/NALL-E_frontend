FROM node:lts-alpine
LABEL MAINTAINER Onur YILDIZ <onuryildizsai@gmail.com>

RUN mkdir app

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app/

EXPOSE 3000

CMD ["npm","start"]