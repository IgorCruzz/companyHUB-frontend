FROM node:10

WORKDIR /app

COPY  package*json \
      tsconfig.json \
      yarn.lock \
      ./
RUN yarn


COPY . .

EXPOSE 3000

CMD ["npm", "start"]
