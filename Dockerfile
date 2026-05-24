FROM node:22@sha256:e3ca095133ba41a0a73b009f19e4253f1a878e70bb9499f6a9d21b19d082bd91 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:42ff6c6704359b80306f35a0c7bb0bbc9b65a058e63f0cc1e91a48fd22e3e1e5
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
