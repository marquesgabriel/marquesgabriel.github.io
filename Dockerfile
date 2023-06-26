FROM node

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

ENV NODE_ENV production

EXPOSE 3069

CMD [ "npx", "serve", "build" ]