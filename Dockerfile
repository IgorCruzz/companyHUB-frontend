FROM node:10-alpine as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY  package*json \
      tsconfig.json \
      yarn.lock \
      ./

RUN yarn
RUN yarn add react-scripts@3.3.1 -g

COPY . /app

RUN yarn build

FROM nginx:1.16.0-alpine
COPY — from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 8080
CMD [“nginx”, “-g”, “daemon off;”]
