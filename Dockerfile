FROM node:22@sha256:9e6918e8e32a47a58ed5fb9bd235bbc1d18a8c272e37f15d502b9db9e36821ee AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:7935b9ee80fe4076ce8ca637fe7bb0c7a1268e2bd854032a0563ecc96bfa6747
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
