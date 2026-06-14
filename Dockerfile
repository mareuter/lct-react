FROM node:22@sha256:1031993481795705055273f2eef0c24597abdcb277d6e058c82f78cbbdef92a6 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:540858b3a92eed95cbcae475698c12f619b4a6afa122485f439e4d7227cbeb38
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
