FROM node:10

WORKDIR /app


COPY  package*json \
      tsconfig.json \
      ./

RUN npm install -g serve
RUN npm install

ARG API
ENV API ${API}

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["serve", "-s", "-l", "8080", "./build"]

