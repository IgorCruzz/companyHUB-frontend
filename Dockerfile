FROM node:10

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY  package*json \
      tsconfig.json \
      yarn.lock \
      ./

RUN yarn
RUN yarn add react-scripts@3.4.2 -g

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start"]
