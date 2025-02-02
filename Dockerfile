FROM node:22@sha256:ae2f3d4cc65d251352eca01ba668824f651a2ee4d2a37e2efb22649521a483fd AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:f2c6d8e7b81820cc0186a764d6558935b521e1a3404647247d329273e01a1886
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
