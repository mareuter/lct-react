FROM node:20@sha256:8d0f16fe841577f9317ab49011c6d819e1fa81f8d4af7ece7ae0ac815e07ac84 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:f7920cacd477354f6b022e3a95f0ff9293c0645515c0b848323fc2b50aab02ea
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
