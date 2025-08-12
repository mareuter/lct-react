FROM node:22@sha256:3218f0d1b9e4b63def322e9ae362d581fbeac1ef21b51fc502ef91386667ce92 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:7935b9ee80fe4076ce8ca637fe7bb0c7a1268e2bd854032a0563ecc96bfa6747
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
