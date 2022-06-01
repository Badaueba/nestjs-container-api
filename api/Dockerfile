FROM node:16.15.0

WORKDIR /api

# install node packages
# RUN yarn install
COPY ./package*.json ./

RUN yarn install

COPY . .

CMD [ "yarn", "start:dev" ]
