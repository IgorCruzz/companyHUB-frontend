FROM node:10

WORKDIR /app


COPY  package*json \
      tsconfig.json \
      yarn.lock \
      ./

RUN yarn
RUN yarn add react-scripts@3.3.1 -g

COPY . .

RUN yarn build

CMD ["yarn", "start"]
