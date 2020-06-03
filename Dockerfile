FROM node:12.13.1-alpine
WORKDIR /usr/src/app
COPY ./client/package*.json ./
RUN npm ci
COPY ./client ./
CMD ["npm", "run", "serve"]