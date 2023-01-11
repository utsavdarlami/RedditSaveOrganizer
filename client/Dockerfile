# first stage
# pull the official base image
FROM node:19-alpine as build-stage

# set working direction
WORKDIR /front

# install application dependencies
COPY package.json ./

RUN npm install

# add front
COPY . /front/
RUN npm run build

# Second stage

FROM nginx:1.19.2-alpine as production-stage

RUN mkdir /app

COPY --from=build-stage /front/build /app

COPY nginx.conf /etc/nginx/nginx.conf
