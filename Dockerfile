FROM node:10-alpine as build

WORKDIR /app

COPY  package*json \
      tsconfig.json \
      yarn.lock \
      ./
RUN yarn
RUN yarn add react-scripts@3.3.1 -g


COPY . .

RUN yarn build

FROM nginx:1.16.0-alpine
COPY — from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD [“nginx”, “-g”, “daemon off;”]
