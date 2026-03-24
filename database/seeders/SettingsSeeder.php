<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['key' => 'pdf_intro_text', 'value' => 'Lo que en nuestra consulta te ofrecemos no es una dieta. Es un cambio en el estilo de vida...'],
            ['key' => 'pdf_brand_name', 'value' => 'MVM Nutrición Integrada'],
            ['key' => 'pdf_brand_subtitle', 'value' => 'Medicina de estilo de vida'],
            ['key' => 'desc_pescados', 'value' => 'El pescado es una fuente fantástica de proteínas de alta calidad, ácidos grasos omega-3, vitaminas y minerales.'],
            ['key' => 'desc_carnes', 'value' => 'Comer carne ofrece varios beneficios para la salud debido a su riqueza en nutrientes esenciales. Proporciona proteínas de alta calidad, vitaminas como B12 y minerales como hierro, zinc y selenio.'],
            ['key' => 'desc_verduras', 'value' => 'Las verduras se aconseja comerlas cocidas, al vapor o hervidas con poca agua. La fibra debe de quedar blanda.'],
            ['key' => 'desc_fruta', 'value' => 'Se aconseja no tomar más de un par de piezas al día. Las frutas no se tomarán nunca en zumo, aunque sea casero o sin azúcares añadidos.'],
            ['key' => 'desc_setas', 'value' => 'Las setas, gracias a su aporte de glucanos, constituyen uno de los grupos de alimentos más saludables que puedes tomar.'],
            ['key' => 'desc_legumbres', 'value' => 'Si comes legumbres, es preferible que sean de las que vienen envasadas en tarro de cristal. Lavar y cocinar.'],
            ['key' => 'desc_cereales', 'value' => 'No se aconsejan cereales de ningún tipo al desayunar.'],
            ['key' => 'desc_tuberculos', 'value' => 'No consumir los tubérculos en forma de puré.'],
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
}
