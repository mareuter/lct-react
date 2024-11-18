FROM node:22@sha256:5c76d05034644fa8ecc9c2aa84e0a83cd981d0ef13af5455b87b9adf5b216561 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:43d396487b4b924c47fa5823678e7e99f8241eda2394afd8f4fc8f3c286c2d5e
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
