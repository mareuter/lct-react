FROM node:22@sha256:f90672bf4c76dfc077d17be4c115b1ae7731d2e8558b457d86bca42aeb193866 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:42e026ae5315aa0deec22fb00c364fc5ec8d9af1c4833ad5317e2a433e4de0df
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
