#!/bin/bash
set -e

echo "[Nutricionista] Iniciando aplicación..."

# Crear .env desde variables de entorno si no existe
if [ ! -f .env ]; then
    echo "[Nutricionista] Creando .env desde .env.example..."
    cp .env.example .env
fi

# Cache de configuración
echo "[Nutricionista] Cacheando configuración..."
php artisan config:cache 2>/dev/null || true
php artisan route:cache 2>/dev/null || true
php artisan view:cache 2>/dev/null || true

# Migraciones
echo "[Nutricionista] Ejecutando migraciones..."
php artisan migrate --force 2>&1 || echo "[Nutricionista] WARN: Migraciones fallaron (puede que la BD no esté lista aún)"

# Seeders solo si la tabla users está vacía
USER_COUNT=$(php artisan tinker --execute="echo \App\Models\User::count();" 2>/dev/null || echo "0")
if [ "$USER_COUNT" = "0" ]; then
    echo "[Nutricionista] BD vacía, ejecutando seeders..."
    php artisan db:seed --force 2>&1 || echo "[Nutricionista] WARN: Seeders fallaron"
else
    echo "[Nutricionista] BD ya tiene datos, omitiendo seeders."
fi

# Permisos
chmod -R 775 storage bootstrap/cache 2>/dev/null || true

echo "[Nutricionista] Arrancando servidor en puerto 8080..."
php artisan serve --host=0.0.0.0 --port=8080
