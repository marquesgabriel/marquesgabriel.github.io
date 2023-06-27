FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

ENV NODE_ENV production

EXPOSE 3069

CMD [ "npx", "serve", "build" ]