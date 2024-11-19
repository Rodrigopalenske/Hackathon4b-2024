FROM php:8.3-apache

WORKDIR /var/www/html

COPY api-laravel .

# Instalando extensões necessárias do PHP
RUN apt-get update && \
    apt-get install -y default-mysql-client msmtp perl wget procps libzip-dev libpng-dev libjpeg-dev libwebp-dev libfreetype6-dev libicu-dev

RUN apt-get install -y --no-install-recommends \
    g++ make automake autoconf zlib1g-dev && \
    docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg --with-webp && \
    docker-php-ext-install gd mysqli pdo pdo_mysql intl bcmath opcache exif zip && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Ativando o módulo Apache mod_rewrite
RUN a2enmod rewrite

# Instalando e habilitando a extensão redis
RUN pecl install redis && docker-php-ext-enable redis

# Configurando o usuário e permissões
RUN addgroup --gid 1000 laravel && adduser --ingroup laravel --uid 1000 --disabled-password --gecos "" laravel
RUN chown -R laravel /var/www/html

USER laravel
