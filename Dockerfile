FROM node:20@sha256:1ae9ba874435551280e95c8a8e74adf8a48d72b564bf9dfe4718231f2144c88f AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:ac96a05e4b3dd2c57c9ca2637012f4fa17b11d5fdd2ce856c2f937bd843f0440
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
