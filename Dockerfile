FROM node:22@sha256:ecabd1cb6956d7acfffe8af6bbfbe2df42362269fd28c227f36367213d0bb777 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:0c3a604353135ac13f3a991e2a98c9958af7b8c0b7251ce1590e0c5ff5e3692c
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
