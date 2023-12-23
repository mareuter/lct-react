FROM node:20@sha256:8d0f16fe841577f9317ab49011c6d819e1fa81f8d4af7ece7ae0ac815e07ac84 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:9700d098d545f9d2ee0660dfb155fe64f4447720a0a763a93f2cf08997227279
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
