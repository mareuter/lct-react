FROM node:22@sha256:2bb201f33898d2c0ce638505b426f4dd038cc00e5b2b4cbba17b069f0fff1496 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:3b4019335070fb6445987c8dd72cf18dec2cbc63b3575581eb66469c8173cd4f
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
