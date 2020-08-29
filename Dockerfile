FROM node:10

WORKDIR /app

COPY  package*json \
      tsconfig.json \
      yarn.lock \
      ./
RUN yarn


COPY . .

CMD ["npm", "start"]
