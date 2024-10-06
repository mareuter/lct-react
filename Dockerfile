FROM node:20@sha256:fffa89e023a3351904c04284029105d9e2ac7020886d683775a298569591e5bb AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:42a11c50654d46498c9f0f1108e95cd82776a98e2b8632a3c1839dcd3ac23e0e
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
