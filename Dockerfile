FROM node:22@sha256:62e4daa6819762bbd3072af77cc282ab72c631c4aed30dd7980192babaf385b3 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:842a3f99afd73859b5c647f8be6f0000849be286674e30d9dbcf7a6902a69487
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
