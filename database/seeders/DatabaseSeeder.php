<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Nutricionista',
            'email' => 'admin@nutricionista.com',
            'password' => bcrypt('password'),
        ]);

        $this->call([
            CatalogSeeder::class,
            SupplementSeeder::class,
            FoodTableTypeSeeder::class,
            FoodSeeder::class,
            SettingsSeeder::class,
        ]);
    }
}
