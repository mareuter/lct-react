FROM node:22@sha256:71bcbb3b215b3fa84b5b167585675072f4c270855e37a599803f1a58141a0716 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:20555a07052bb7a1a0ed233d5dba2bdafb75e537948fadbc0e1fef151088dcdd
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
