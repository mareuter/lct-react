FROM node:22@sha256:363e1587494626837fa7f9a23bdb453d13b0ff3c67c705c2805cfc69c2d2fad7 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:0aa2d81d65bc0cac0407e738b8f07d312c8685a84225fcb4db7bcbdd8c9bdf11
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
