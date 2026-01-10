FROM node:22@sha256:8739e532180cfe09e03bbb4545fc725b044c921280532d7c9c1480ba2396837e AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:185920f18bb13f030b6c4c5f1dd728aed4efd483a81dab29c559b8c9e3ca4c65
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
