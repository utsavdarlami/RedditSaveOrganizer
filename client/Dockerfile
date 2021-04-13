# pull the official base image
FROM node:alpine

# set working direction
WORKDIR /front

# add `/front/node_modules/.bin` to $PATH
ENV PATH /front/node_modules/.bin:$PATH

# install application dependencies
COPY package.json /front/
COPY package-lock.json /front/

RUN npm install

# add front 
COPY . /front/

# RUN npm run build
# RUN npm install -g serve

# start front 
CMD ["npm", "start"]
# CMD ["serve", "-p", "3000", "-s", "./build"]
