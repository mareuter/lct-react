FROM node:20@sha256:445acd9b2ef7e9de665424053bf95652e0b8995ef36500557d48faf29300170a AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx@sha256:8091c5f722b5060431042b000a742df96a586c6ecc3dcb440fbbdbdc3c261f3e
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
