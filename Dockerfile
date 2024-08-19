FROM node:20@sha256:d3c8ababe9566f9f3495d0d365a5c4b393f607924647dd52e75bf4f8a54effd3 AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:c74747feb6a59b0b47d3da0656b58d702659b4ff2e38aa8c552bb3b5cc3e08a8
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
