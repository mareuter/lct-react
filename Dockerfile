FROM node:20@sha256:8a03de2385cb16c4d76aac30bf86ab05f55f1754a5402dc9039916e8043f019a AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:25b1dd75ab9caf2f84bc35cc82c0924c93a2b5b2495e280bb8f3bad826d5fb37
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
