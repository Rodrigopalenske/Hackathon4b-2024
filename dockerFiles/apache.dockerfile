# dockerfiles/apache.dockerfile
FROM php:8.3-apache

# Instale as extensões necessárias
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev libzip-dev unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql zip \
    && a2enmod rewrite

# Configuração do Apache
COPY dockerFiles/etc/apache/vhost.conf /etc/apache2/sites-available/000-default.conf
