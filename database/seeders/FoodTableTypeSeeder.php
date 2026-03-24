<?php

namespace Database\Seeders;

use App\Models\FoodTableType;
use Illuminate\Database\Seeder;

class FoodTableTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            ['name' => 'Pescado Azul', 'frequency_count' => 3, 'fc0_label' => 'No se aconseja', 'fc1_label' => '1 vez en semana máximo', 'fc2_label' => '2 veces en semana', 'fc3_label' => null],
            ['name' => 'Pescado blanco', 'frequency_count' => 2, 'fc0_label' => 'No se aconseja', 'fc1_label' => '1-2 veces en semana', 'fc2_label' => null, 'fc3_label' => null],
            ['name' => 'Carne Roja', 'frequency_count' => 2, 'fc0_label' => 'No se aconseja', 'fc1_label' => '1 vez en semana', 'fc2_label' => null, 'fc3_label' => null],
            ['name' => 'Carne blanca', 'frequency_count' => 2, 'fc0_label' => 'No se aconseja', 'fc1_label' => '1-2 veces en semana', 'fc2_label' => null, 'fc3_label' => null],
            ['name' => 'Verduras y hortalizas', 'frequency_count' => 4, 'fc0_label' => 'No se aconseja', 'fc1_label' => '1-2 veces en semana', 'fc2_label' => '2 veces en semana', 'fc3_label' => '5-6 veces en semana'],
            ['name' => 'Fruta', 'frequency_count' => 3, 'fc0_label' => 'No se aconseja', 'fc1_label' => '1-2 veces en semana', 'fc2_label' => '3- 5 veces en semana', 'fc3_label' => null],
            ['name' => 'Setas', 'frequency_count' => 2, 'fc0_label' => 'No se aconseja', 'fc1_label' => '1-2 veces en semana', 'fc2_label' => null, 'fc3_label' => null],
            ['name' => 'Legumbres', 'frequency_count' => 2, 'fc0_label' => 'No se aconseja', 'fc1_label' => '1 vez en semana', 'fc2_label' => null, 'fc3_label' => null],
            ['name' => 'Arroz', 'frequency_count' => 2, 'fc0_label' => 'No se aconseja', 'fc1_label' => '1 vez en semana', 'fc2_label' => null, 'fc3_label' => null],
            ['name' => 'Pasta y pizzas', 'frequency_count' => 2, 'fc0_label' => 'No se aconseja', 'fc1_label' => '1 vez en semana', 'fc2_label' => null, 'fc3_label' => null],
            ['name' => 'Pan', 'frequency_count' => 3, 'fc0_label' => 'No se aconseja', 'fc1_label' => '1-2 rebanadas al día', 'fc2_label' => '2-3 rebanadas al día', 'fc3_label' => null],
            ['name' => 'Cereales', 'frequency_count' => 2, 'fc0_label' => 'No se aconseja', 'fc1_label' => 'Aconsejados', 'fc2_label' => null, 'fc3_label' => null],
            ['name' => 'Tubérculos', 'frequency_count' => 3, 'fc0_label' => 'No se aconseja', 'fc1_label' => '1 vez en semana o cada 10 días', 'fc2_label' => '2-3 veces en semana', 'fc3_label' => null],
            ['name' => 'Bebidas vegetales', 'frequency_count' => 3, 'fc0_label' => 'No se aconseja', 'fc1_label' => '1-3 veces en semana', 'fc2_label' => '3-5 veces a la semana', 'fc3_label' => null],
            ['name' => 'Productos lácteos', 'frequency_count' => 3, 'fc0_label' => 'No se aconseja', 'fc1_label' => '1-2 veces en semana', 'fc2_label' => '1-2 veces en semana', 'fc3_label' => null],
            ['name' => 'Marisco', 'frequency_count' => 2, 'fc0_label' => 'No se aconseja', 'fc1_label' => '1-2 veces en semana', 'fc2_label' => null, 'fc3_label' => null],
            ['name' => 'Embutidos', 'frequency_count' => 3, 'fc0_label' => 'No se aconseja', 'fc1_label' => '1-2 veces en semana', 'fc2_label' => '2-3 veces en semana', 'fc3_label' => null],
            ['name' => 'Huevos', 'frequency_count' => 3, 'fc0_label' => 'No se aconseja', 'fc1_label' => '5-7 a la semana', 'fc2_label' => '8-10 a la semana', 'fc3_label' => null],
            ['name' => 'Dulces y Chocolate', 'frequency_count' => 2, 'fc0_label' => 'No se aconseja', 'fc1_label' => 'Sólo si supera el 85%', 'fc2_label' => null, 'fc3_label' => null],
            ['name' => 'Frutos secos', 'frequency_count' => 3, 'fc0_label' => 'No se aconseja', 'fc1_label' => '1-2 veces en semana', 'fc2_label' => '3 veces a la semana', 'fc3_label' => null],
            ['name' => 'Café e infusiones', 'frequency_count' => 3, 'fc0_label' => 'No se aconseja', 'fc1_label' => '2-3 veces en semana', 'fc2_label' => '5-7 veces en semana', 'fc3_label' => null],
            ['name' => 'Encurtidos', 'frequency_count' => 3, 'fc0_label' => 'No se aconseja', 'fc1_label' => '1-2 veces en semana', 'fc2_label' => '2-3 veces en semana', 'fc3_label' => null],
            ['name' => 'Aceite', 'frequency_count' => 3, 'fc0_label' => 'No se aconseja', 'fc1_label' => '2-3 veces en semana', 'fc2_label' => 'A diario', 'fc3_label' => null],
            ['name' => 'Algas', 'frequency_count' => 3, 'fc0_label' => 'No se aconseja', 'fc1_label' => '1-2 veces en semana', 'fc2_label' => '3-4 veces en semana', 'fc3_label' => null],
            ['name' => 'Especias', 'frequency_count' => 3, 'fc0_label' => 'No se aconseja', 'fc1_label' => '2-3 veces en semana', 'fc2_label' => '3-5 veces en semana', 'fc3_label' => null],
        ];

        $order = 1;

        foreach ($types as $type) {
            FoodTableType::create(array_merge($type, ['sort_order' => $order++]));
        }
    }
}
