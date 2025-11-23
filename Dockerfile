FROM node:22@sha256:dcf06103a9d4087e3244a51697adbbb85331dcb7161dbe994ca1cd07dd32e2a5 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:3048d7a6bad5fb1a1a2516249e570b85645a00411bad6b3126983577f040bb5f
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
