FROM node:22@sha256:c8abd8da9cfddd2dfd2d5aa9ea2e54f9f70d3968ecf81bf5c2422594fa13fa83 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:4a8e7d03e7c8b3fadfd47a886228f9b08eb9a99416e342d0592e9b0af73fba9d
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
