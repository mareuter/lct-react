FROM node:20@sha256:ab71b9da5ba19445dc5bb76bf99c218941db2c4d70ff4de4e0d9ec90920bfe3f AS builder
LABEL maintainer mareuternh@gmail.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:stable@sha256:ec881e8e2b068e388e992e0e12360ff9f93737f90eb3e346d0ceac83710383d8
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
