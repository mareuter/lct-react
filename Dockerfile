FROM node:20@sha256:fd0115473b293460df5b217ea73ff216928f2b0bb7650c5e7aa56aae4c028426 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:c2854e7c6fdfb1f12554f7b36bdd74047ec1ab886ff59379fd113400c120584f
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
