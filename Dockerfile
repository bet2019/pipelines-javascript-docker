FROM nginx:1.15 as base

RUN rm -f /etc/nginx/conf.d/default.conf \
  && ln -fs /usr/share/zoneinfo/UTC /etc/localtime && dpkg-reconfigure -f noninteractive tzdata
WORKDIR /srv/www/app

#--------

FROM base as production

COPY ./docker/nginx-http.conf /etc/nginx/nginx.conf
COPY ./docker/nginx-vhost.conf /etc/nginx/conf.d/app.conf
COPY ./public /srv/www/app