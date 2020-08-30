FROM node:10

WORKDIR /app


COPY  package*json \
      tsconfig.json \
      ./

RUN npm install -g serve
RUN npm install
//RUN yarn add react-scripts@3.4.2 -g

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["serve", "-s", "-l", "8080", "./build"]

