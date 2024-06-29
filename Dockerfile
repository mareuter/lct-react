FROM node:20@sha256:b849bc4078c3e16a38d72749ab8faeacbcc6c3bdb742399b4a5974a89fc93261 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:e43407ce353dfe317efe69eb33716e61d0ae613080ef7df65fb08e39bab36ab8
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
