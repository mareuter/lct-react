FROM node:22@sha256:23c24e85395992be118734a39903e08c8f7d1abc73978c46b6bda90060091a49 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:10f4f3e09ace179005137b811167c8dc03c089b60059236d45c340f1f1e56ac3
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
