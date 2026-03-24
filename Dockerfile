FROM php:8.4-cli

# Instalar extensiones PHP necesarias
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copiar dependencias PHP
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Copiar dependencias Node
COPY package.json package-lock.json ./
RUN npm ci

# Copiar el resto del proyecto
COPY . .

# Post-install scripts de Laravel
RUN composer run post-autoload-dump

# Build de assets
RUN npm run build

# Crear directorio SQLite por si acaso y permisos storage
RUN mkdir -p storage/framework/{sessions,views,cache} \
    && mkdir -p bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Generar key si no existe
RUN if [ ! -f .env ]; then cp .env.example .env && php artisan key:generate; fi

# Migraciones y seeders en arranque
RUN echo '#!/bin/bash\nphp artisan migrate --force --seed 2>/dev/null\nphp artisan serve --host=0.0.0.0 --port=8080' > /start.sh \
    && chmod +x /start.sh

EXPOSE 8080

CMD ["/start.sh"]
