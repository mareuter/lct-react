FROM node:22@sha256:8a34c4ab3ea2c5cd194f07e317b2a8f09461d3c8b05c4e34c8ccd56d56024c4d AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:0aa2d81d65bc0cac0407e738b8f07d312c8685a84225fcb4db7bcbdd8c9bdf11
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
