# syntax=docker/dockerfile:1

#Here we are getting our node as Base image
FROM node:16-alpine
ENV PORT=5173
ENV VITE_BACK=http://localhost:8080

#Creating a new directory for app files and setting path in the container
WORKDIR /usr/src/app
COPY . .
# installing the dependencies into the container
RUN npm ci
RUN npm run build --if-present
#container exposed network port number
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--port", "5173"]