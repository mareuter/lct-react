FROM node:22@sha256:0e910f435308c36ea60b4cfd7b80208044d77a074d16b768a81901ce938a62dc AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:df6f3c8e3fb6161cc5e85c8db042c8e62cfb7948fc4d6fddfad32741c3e2520d
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
