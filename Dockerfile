FROM node:22@sha256:7725a5c2c83eed1d36258c66efae14b1ceccd021db9ed1d9559d3335ed3d68ed AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:5cf90903deda2c5981b8ad05e7617ac010e389f0dde0ac83487c02c509281de6
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
