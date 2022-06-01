FROM node:16:alpine

WORKDIR /api

# install node packages
# RUN yarn install
COPY ./package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start:dev" ]
