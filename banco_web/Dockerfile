# syntax=docker/dockerfile:1

#Here we are getting our node as Base image
FROM node:16-alpine
ENV PORT=8080
ENV DB_URL=mongodb://banco-db:27017
ENV FRONT_URL=banco-f

#Creating a new directory for app files and setting path in the container
WORKDIR /usr/src/app
COPY . .
# installing the dependencies into the container
RUN npm ci
RUN npm run build --if-present
#container exposed network port number
EXPOSE 8080
CMD ["npm", "run", "dev"]