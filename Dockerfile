FROM node:22@sha256:9059d9d7db987b86299e052ff6630cd95e5a770336967c21110e53289a877433 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:55d1fb0944aafb8534b253e486c6cf57d3e0c785c4f6a7b3e9f02c5a080fb2ce
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
