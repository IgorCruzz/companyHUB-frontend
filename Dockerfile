FROM node:10

WORKDIR /app

COPY  package*json \
      tsconfig.json \
      yarn.lock \
      ./
RUN yarn


COPY . .

RUN yarn build


FROM nginx:1.12-alpine
COPY --from=build-deps /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
