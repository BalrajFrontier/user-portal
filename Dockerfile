FROM node:16.14.0

WORKDIR /app

COPY packege.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]