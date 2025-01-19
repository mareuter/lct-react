FROM node:22@sha256:99981c3d1aac0d98cd9f03f74b92dddf30f30ffb0b34e6df8bd96283f62f12c6 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:f2c6d8e7b81820cc0186a764d6558935b521e1a3404647247d329273e01a1886
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
