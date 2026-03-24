#!/bin/bash
set -e

echo "[Nutricionista] Iniciando aplicación..."
echo "[Nutricionista] DB_CONNECTION=${DB_CONNECTION:-no definido}"
echo "[Nutricionista] DB_HOST=${DB_HOST:-no definido}"

# IMPORTANTE: NO cachear config — las variables de entorno de EasyPanel
# se inyectan como env vars del sistema, no como .env file.
# config:cache congela los valores y ignora las env vars.
php artisan config:clear 2>/dev/null || true
php artisan route:clear 2>/dev/null || true
php artisan view:clear 2>/dev/null || true

# Permisos
chmod -R 775 storage bootstrap/cache 2>/dev/null || true

# Esperar a que MySQL esté disponible
echo "[Nutricionista] Esperando a la base de datos..."
for i in $(seq 1 30); do
    php artisan tinker --execute="DB::connection()->getPdo(); echo 'OK';" 2>/dev/null && break
    echo "[Nutricionista] BD no disponible, reintentando ($i/30)..."
    sleep 2
done

# Migraciones
echo "[Nutricionista] Ejecutando migraciones..."
php artisan migrate --force 2>&1 || echo "[Nutricionista] WARN: Migraciones fallaron"

# Seeders solo si la tabla users está vacía
USER_COUNT=$(php artisan tinker --execute="echo \App\Models\User::count();" 2>/dev/null || echo "0")
if [ "$USER_COUNT" = "0" ]; then
    echo "[Nutricionista] BD vacía, ejecutando seeders..."
    php artisan db:seed --force 2>&1 || echo "[Nutricionista] WARN: Seeders fallaron"
else
    echo "[Nutricionista] BD ya tiene datos ($USER_COUNT usuarios), omitiendo seeders."
fi

echo "[Nutricionista] Arrancando servidor en puerto 8080..."
php artisan serve --host=0.0.0.0 --port=8080
