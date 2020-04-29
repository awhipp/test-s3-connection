# specify the node base image with your desired version node:<version>
FROM node:12

WORKDIR /

ADD app.js /
ADD package.json /
ADD package-lock.json /

RUN npm install