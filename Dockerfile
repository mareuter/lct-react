FROM node:22@sha256:37ff334612f77d8f999c10af8797727b731629c26f2e83caa6af390998bdc49c AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:179f4cd0887d5e2b6ea04e50ef591336a9eeb4cb4f24b3ff854e220c015e0632
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
