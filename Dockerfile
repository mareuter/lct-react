FROM node:22@sha256:8739e532180cfe09e03bbb4545fc725b044c921280532d7c9c1480ba2396837e AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:e7e2c41c74775ccfe88d07fa3d9ebc9e0d6ae5c755244bc525153b37e308f699
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
