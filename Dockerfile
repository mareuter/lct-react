FROM node:22@sha256:1031993481795705055273f2eef0c24597abdcb277d6e058c82f78cbbdef92a6 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:42ff6c6704359b80306f35a0c7bb0bbc9b65a058e63f0cc1e91a48fd22e3e1e5
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
