FROM node:22@sha256:8739e532180cfe09e03bbb4545fc725b044c921280532d7c9c1480ba2396837e AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:0a1f2fb3231e1c0c1360ba383a2d02728b5912bb13eb87406839e2002e472fae
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
