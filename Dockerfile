FROM node:22@sha256:e558507eb799e3a76fcdaaee5e48dce1a00aebc85892128a9fca59f63bd49511 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:eaa7e36decc3421fc04478c586dfea0d931cebe47d5bc0b15d758a32ba51126f
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
