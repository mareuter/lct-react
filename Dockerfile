FROM node:20@sha256:93d2e801dabc677ea0b30b47d3d729fab63ecb20be7ac0ab204cc3c65731297a AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:ac96a05e4b3dd2c57c9ca2637012f4fa17b11d5fdd2ce856c2f937bd843f0440
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
