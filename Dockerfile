FROM node:22@sha256:23c24e85395992be118734a39903e08c8f7d1abc73978c46b6bda90060091a49 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:3b4019335070fb6445987c8dd72cf18dec2cbc63b3575581eb66469c8173cd4f
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
