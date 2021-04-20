# pull the official base image
FROM node:alpine

# set working direction
WORKDIR /front

# add `/front/node_modules/.bin` to $PATH
ENV PATH /front/node_modules/.bin:$PATH

# install application dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install --legacy-peer-deps 

# add front 
COPY . ./

#RUN npm run build
#RUN npm install -g serve

# start front 
CMD ["npm", "start"]
#CMD ["serve", "-p", "3000", "-s", "./build"]
