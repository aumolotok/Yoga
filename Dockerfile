FROM node
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci
RUN git pull

COPY . .

CMD ["npm", "run", "start"]