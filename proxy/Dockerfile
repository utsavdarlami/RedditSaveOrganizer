FROM nginx:1.19.2-alpine 

# http://blog.tobiasforkel.de/en/2016/09/10/nginx-docker-container-and-getpwnamwww-data-problem/
#RUN addgroup -g 1010 -S www-data && adduser -u 1010 -D-S -G www-data www-data

COPY nginx.conf /etc/nginx/nginx.conf
