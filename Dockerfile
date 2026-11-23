FROM nginxinc/nginx-unprivileged:stable-alpine
COPY site/ /usr/share/nginx/html/
EXPOSE 8080
