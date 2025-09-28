FROM node:22@sha256:4973262386dc1cb70f7d6fc48a855027d8f12d2d3b1fe559b9db9a4fcb74668f AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:2945a0bfa07bf1d3cb9ba5f03678e2827f11c240e4c9d38e075037938310062a
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
