FROM php:8.3-apache

# Definir diretório de trabalho
WORKDIR /var/www/html

# Copiar o código da aplicação Laravel para dentro do contêiner
COPY api-laravel ./ 

# Baixar o script wait-for-it.sh
RUN curl -sS -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/local/bin/wait-for-it.sh

# Instalar dependências do sistema e ferramentas para PHP
RUN apt-get update && \
    apt-get install -y \
    default-mysql-client \
    msmtp \
    perl \
    wget \
    procps \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libwebp-dev \
    libfreetype6-dev \
    libicu-dev \
    g++ \
    make \
    automake \
    autoconf \
    zlib1g-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar e configurar as extensões PHP necessárias
RUN docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg --with-webp && \
    docker-php-ext-install gd mysqli pdo pdo_mysql intl bcmath opcache exif zip

# Instalar a extensão Redis
RUN pecl install redis && docker-php-ext-enable redis

# Ativar o módulo Apache mod_rewrite (necessário para o Laravel)
RUN a2enmod rewrite

# Alterar a configuração do Apache para ouvir na porta 8000
RUN sed -i 's/80/8000/' /etc/apache2/ports.conf

# Criar o arquivo de configuração do Apache para a porta 8000
RUN echo '<VirtualHost *:8000>\n\
    DocumentRoot /var/www/html/public\n\
    <Directory /var/www/html/public>\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>\n\
</VirtualHost>' > /etc/apache2/sites-available/000-default.conf

# Instalar o Composer (gerenciador de dependências do PHP)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Rodar o Composer install para instalar as dependências do Laravel
RUN composer install --no-interaction --optimize-autoloader

# Criar o usuário "laravel" e garantir que ele tenha permissões corretas
RUN addgroup --gid 1000 laravel && \
    adduser --ingroup laravel --uid 1000 --disabled-password --gecos "" laravel && \
    chown -R laravel:laravel /var/www/html

# Definir o usuário para rodar o Apache
USER laravel

# Expor a porta 8000 para o Laravel
EXPOSE 8000

# Comando para aguardar o MySQL estar disponível, rodar as migrações e iniciar o Apache
CMD /usr/local/bin/wait-for-it.sh mysql:3306 -- php artisan migrate --force && apache2-foreground
