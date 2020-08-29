FROM node:10

WORKDIR /app

COPY  package*json \
      tsconfig.json \
      yarn.lock \
      ./
RUN yarn


COPY . .

RUN yarn build

CMD ["yarn", "start"]
