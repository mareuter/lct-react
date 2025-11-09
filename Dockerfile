FROM node:22@sha256:22ab967fdf8d9ce32387d0c06ab2e32c6793d860bb93ccce6e27927ccdfeee6d AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:515d587000ffd63e133b5b244209bbecc92187dd43d6b8f5220cf66ec830b0ab
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
