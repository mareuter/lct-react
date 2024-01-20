FROM node:20@sha256:ffebb4405810c92d267a764b21975fb2d96772e41877248a37bf3abaa0d3b590 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:401bc2c812345a6c64a0fd5504db5e8b511c7c8e62855a827c57944280835703
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
