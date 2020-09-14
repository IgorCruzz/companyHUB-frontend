FROM node:14

WORKDIR /app


COPY  package*json \
      tsconfig.json \
      ./

RUN npm install -g serve
RUN npm install

ARG API
ENV REACT_APP_API ${API}

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["serve", "-s", "-l", "8080", "./build"]

