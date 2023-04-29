FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

# RUN chmod -R 777 node_modules

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]