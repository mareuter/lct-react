FROM node:22@sha256:63538dfe497cc29dfafdda25ada09b46db68a3f4cc205abf1f5d6bf0913f3384 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:a7675fcee220f59b4a99f7098c06a0d5d999c2c0ee37c0211efb780536e5cb20
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
