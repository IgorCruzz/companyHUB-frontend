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

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
