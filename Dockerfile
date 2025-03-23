FROM node:22@sha256:c7fd844945a76eeaa83cb372e4d289b4a30b478a1c80e16c685b62c54156285b AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:be4f49e87cc022c1332bd4a9d84fb66bd76c72b6399b57193adec00ec9a616d2
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
