FROM node:22@sha256:a25c9934ff6382cd4f08b6bc26c82bf4ea69b1e6f8dabfb2ead457374127c365 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:5825bde471b86b270298e80ba1f0f3e515a73da1a17a982632f1c262689f1144
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
