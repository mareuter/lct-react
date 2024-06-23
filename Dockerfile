FROM node:20@sha256:02cd2205818f121c13612721876f28c18bd50148bb8af532ea121c96ffcb59bf AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:e43407ce353dfe317efe69eb33716e61d0ae613080ef7df65fb08e39bab36ab8
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
