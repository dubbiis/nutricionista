<?php

namespace Database\Seeders;

use App\Models\CatalogItem;
use App\Models\CatalogSection;
use Illuminate\Database\Seeder;

class CatalogSeeder extends Seeder
{
    public function run(): void
    {
        $sections = $this->getSections();

        $sectionOrder = 1;

        foreach ($sections as $sectionData) {
            $section = CatalogSection::create([
                'slug'       => $sectionData['slug'],
                'name'       => $sectionData['name'],
                'group'      => $sectionData['group'],
                'sort_order' => $sectionOrder++,
            ]);

            $itemOrder = 1;
            foreach ($sectionData['items'] as $label) {
                CatalogItem::create([
                    'catalog_section_id' => $section->id,
                    'label'              => $label,
                    'sort_order'         => $itemOrder++,
                ]);
            }
        }
    }

    private function getSections(): array
    {
        return [
            // ─── Group: estrategias ───────────────────────────────────────

            [
                'slug'  => 'estrategias_hormeticas',
                'name'  => 'Estrategias Horméticas',
                'group' => 'estrategias',
                'items' => [
                    'Ayuno 16 horas',
                    'Baño y/o Ducha agua fria 2-3 min',
                    'Caminar descalzo',
                    'Deporte 30-40 ejercicio moderado entre mañana y tarde',
                    'Deporte aire libre',
                    'Deporte en Ayunas',
                    'Deporte motivante',
                    'Ejercicio Brazos 10-12 min',
                    'Ejercicio Brazos y Piernas Extenso',
                    'Ejercicio en Sauna o Baño Turco',
                    'Ejercicios Hipopresivos',
                    'Empieza con ejercicios de fuerza Personas Mayores',
                    'Empieza con el deporte ya',
                    'Escuchar Música',
                    'Escudo Solar',
                    'Esperar 40min tras Deporte',
                    'Estimulación Cutánea Sin Pijama masaje caricias',
                    'Estimulación del Nervio Vago',
                    'Hipercapnia',
                    'Hipercapnia - Dolor Crónico',
                    'Hipoxia Intermitente Lenta',
                    'Hipoxia Intermitente Rápida',
                    'Manta pesada ponderada',
                    'Naturaleza',
                    'Sesiones de Baño Turco',
                    'Sesiones de Sauna',
                    'Sitting Break',
                    'Suspiro Voluntario',
                    'Tabata 3-4 veces en semana',
                ],
            ],

            [
                'slug'  => 'estrategias_evidencia',
                'name'  => 'Estrategias Basadas en la Evidencia Científica',
                'group' => 'estrategias',
                'items' => [
                    'Cenar Temprano',
                    'Cocina sin Microondas',
                    'Comer 3 veces Max',
                    'Cosméticos Ecológicos',
                    'Cuidado Encías',
                    'Ejercicio Respiratorio',
                    'Entrenamiento Olfatorio',
                    'Fumar Garbanzos por Cigarros',
                    'Hidratación',
                    'Higiene',
                    'Higiene del Sueño',
                    'Higiene Electromagnética',
                    'Lecturas Recomendadas',
                    'Más tiempo en la Cocina',
                    'Mastica despacio',
                    'Meditación',
                    'Modificar Rutinas',
                    'Procrastinación',
                    'Protección en la fumigación',
                    'Psico Trampa Gula',
                    'Socializar',
                    'Taburete en el baño',
                    'Terapia Espejo',
                    'Tiempo frente a Pantallas',
                    'Trabajar el Desapego',
                    'Zumo de limón natural junto a la comida',
                ],
            ],

            // ─── Group: indicaciones ──────────────────────────────────────

            [
                'slug'  => 'indicaciones_pescados',
                'name'  => 'Indicaciones Pescados',
                'group' => 'indicaciones',
                'items' => [
                    'Ceviche de Pescado AZUL',
                    'Con el pescado lo haces muy bien sigue así',
                    'Incrementa Consumo de Pescado 2-3 Semana',
                    'Incrementa el consumo de pescado y su variedad',
                    'Pescado papillote',
                    'Te recomiendo comer más pescado',
                    'Te recomiendo comer más pescado AZUL',
                    'Te recomiendo comer más pescado BLANCO',
                ],
            ],

            [
                'slug'  => 'indicaciones_carnes',
                'name'  => 'Indicaciones Carnes',
                'group' => 'indicaciones',
                'items' => [
                    '4 ingestas a la semana por la noche solo Blanca',
                    'Algo más de carne pavo pollo y filete de hígado de ternera',
                    'Caldo de huesos Empieza a tomarlo',
                    'Caldo de huesos No dejes de tomarlo',
                    'Carne Roja 1 o 2 Veces por semana',
                    'Carne Blanca Más variedad',
                    'Carne Cerdo No comer si no es Ibérico',
                    'Carne Mamífero No comer',
                    'Carne Roja de Pasto o Ecológica',
                    'Carne Roja No comas por ahora',
                    'Carne Roja No comer carne no ecológica',
                    'Carne Roja Reducir consumo carne no ecológica',
                    'Come algo más de carne de todo tipo',
                    'Come Tuétanos + enlace de compra',
                    'Con la carne lo hace muy bien sigue así',
                    'Filete de Hígado de Ternera y Cordero',
                    'Filete de Hígado de Ternera y Cordero pollo e higaditos de pollo',
                    'Incorpora un poco de carne roja de pasto o ecológica o carne de monte',
                    'Incorpora un poco de ternera y carne de monte si encuentras',
                ],
            ],

            [
                'slug'  => 'indicaciones_verduras',
                'name'  => 'Indicaciones Verduras y Hortalizas',
                'group' => 'indicaciones',
                'items' => [
                    'Ajo picado con aceite de oliva',
                    'Aumenta el Consumo de Verduras',
                    'Eliminar consumo verduras flatulentas',
                    'Ralladura de cáscara de cítricos en las ensaladas',
                    'Reducir consumo verduras flatulentas',
                    'Verduras 4 veces a la semana disbiosis o SIBO',
                    'Verduras a 3-4 veces a la semana',
                    'Verduras cocidas vapor hervidas y al menos 2 veces trituradas',
                    'Verduras muy bien hervidas y de vez en cuando en puré',
                    'Verduras muy bien hervidas y si es posible en puré',
                ],
            ],

            [
                'slug'  => 'indicaciones_fruta',
                'name'  => 'Indicaciones Fruta',
                'group' => 'indicaciones',
                'items' => [
                    'Aumenta el consumo de fruta radicales libres envejecimiento',
                    'Aumenta el consumo de fruta Al menos 2 al día',
                    'Come algo de fruta radicales libres envejecimiento',
                    'Cuidado con la fruta y los niveles de Glucosa',
                    'Disminuye el consumo de fruta a 2 al día',
                    'Empieza con el aguacate',
                    'No comas fruta por ahora',
                    'No comer Naranja con Diarrea',
                    'Procura comer Frutas pero solo las de carga glucémica baja',
                    'Procura comer Frutas pero solo las de carga glucémica baja o media',
                    'Sigue con el aguacate',
                    'Te señalamos las frutas para ir al servicio problemas digestivos',
                ],
            ],

            [
                'slug'  => 'indicaciones_setas',
                'name'  => 'Indicaciones Setas',
                'group' => 'indicaciones',
                'items' => [
                    'Consume Setas Revuelto o sofritas con ajo',
                    'Introducir setas en los purés de verduras si no te gustan enteras',
                    'No dejes de comerlas inmunomodulador vitaminas y minerales',
                    'No te recomiendo Comerlas por ahora',
                ],
            ],

            [
                'slug'  => 'indicaciones_legumbres',
                'name'  => 'Indicaciones Legumbres',
                'group' => 'indicaciones',
                'items' => [
                    'Eliminar durante 2 meses después una vez en semana',
                    'Eliminar durante 3 meses después una vez en semana',
                    'Legumbres solo al día siguiente a Quimioterapia',
                    'No comas Legumbres',
                    'No comer más de 1 vez en semana',
                    'No comer más de 2 veces en semana',
                    'Quinoa es un Pseudocereal No más de 1-2 veces semana y acompañado de proteína o fibra',
                    'Sigue como hasta ahora no las consumas',
                ],
            ],

            [
                'slug'  => 'indicaciones_cereales',
                'name'  => 'Indicaciones Cereales',
                'group' => 'indicaciones',
                'items' => [
                    'Cereales aconsejados No Aplica a Bebidas Vegetales',
                    'Come arroz o pasta de Konjac 1 vez a la semana',
                    'Cucharada Levadura Nutricional',
                    'Gluten Eliminar Permeab Intestinal Sistema Inmune',
                    'Gluten no aconsejable',
                    'Gluten no aconsejable Por Sintomatología Intolerancia o Celiaco',
                    'Gluten no aconsejable Psoriasis',
                    'Ni pasta ni arroz',
                    'Ni pasta ni arroz ni cereales',
                    'Ni pasta ni arroz para cenar 1 vez semana',
                    'No bajes la guardia con la pasta konjac',
                    'No comer tanto pan Cambiar a Centeno espelta o sarraceno',
                    'Receta Pan de Sarraceno',
                    'Toma algo de Algarroba',
                    'Tortitas de Sarraceno + receta',
                ],
            ],

            [
                'slug'  => 'indicaciones_tuberculos',
                'name'  => 'Indicaciones Tubérculos',
                'group' => 'indicaciones',
                'items' => [
                    'Consumir como Puré y bien hervidos',
                    'Evitar Patata',
                    'No comas patatas fritas y menos de bolsa',
                    'No comer Mucha Cantidad en total no más de 1 vez en semana',
                    'No consumir como Puré ni Asados Comer Hervidos o al Vapor',
                    'No consumir como Puré y nunca por la noche',
                ],
            ],

            [
                'slug'  => 'indicaciones_bebidas_vegetales',
                'name'  => 'Indicaciones Bebidas Vegetales',
                'group' => 'indicaciones',
                'items' => [],
            ],

            [
                'slug'  => 'indicaciones_lacteos',
                'name'  => 'Indicaciones Productos Lácteos',
                'group' => 'indicaciones',
                'items' => [
                    'Aumenta el consumo de alimentos Fermentados',
                    'Con los Lacteos lo haces Genial Sigue así',
                    'Deja los Lacteos por Ahora + Productos Origen Vegetal',
                    'Erradica los Lacteos Contraindicado con el Helicobacter Pílori',
                    'Evita el consumo de alimentos Fermentados',
                    'Evitar los Lácteos durante 2-3 meses y después puntualmente',
                    'Evitar los lácteos Relación Estreñimiento',
                    'Evitar los Lácteos Relación Psoriasis',
                    'Evitar los Lácteos Relación Síntomas Digestivos',
                    'Factores crecimiento IGF-I',
                    'No tomes Helados',
                    'Yogurt Absolutelly Coconut de Alpro',
                ],
            ],

            [
                'slug'  => 'indicaciones_marisco',
                'name'  => 'Indicaciones Marisco',
                'group' => 'indicaciones',
                'items' => [
                    'Aumenta su consumo y variedad',
                    'Consume Marisco siempre que puedas',
                    'Excelente fuente de prot + vit + miner Aumentar consumo',
                    'Excelente fuente de prot + vit + miner Incorpora su consumo',
                    'Puede contener purinas moderar consumo si ácido úrico',
                    'Utiliza la tinta de calamar o sepia para cocinar',
                ],
            ],

            [
                'slug'  => 'indicaciones_embutidos',
                'name'  => 'Indicaciones Embutidos',
                'group' => 'indicaciones',
                'items' => [],
            ],

            [
                'slug'  => 'indicaciones_huevos',
                'name'  => 'Indicaciones Huevos',
                'group' => 'indicaciones',
                'items' => [
                    'Come más yemas de huevo',
                    'Incrementa Su Consumo 5-7',
                    'Incrementa Su Consumo 8-10',
                    'Incrementa su Consumo Plancha cocidos no fritos 5-7',
                    'Incrementa su Consumo Plancha cocidos no fritos 8-10',
                    'Introduce el huevo en tu alimentación 5-7',
                    'Las yemas te benefician bastante',
                ],
            ],

            [
                'slug'  => 'indicaciones_dulces',
                'name'  => 'Indicaciones Dulces y Chocolate',
                'group' => 'indicaciones',
                'items' => [
                    'Dulces Dañinos Evítalos Siempre Sobretodo Industriales',
                    'Dulces Dañinos Evítalos Siempre No comas golosinas',
                    'Dulces Dañinos No los comas ni los caseros que haces',
                    'Edulcorantes Eritritol xilitol glicina en polvo',
                    'Recetas Dulces Saludables',
                    'Recomendación Gelatina neutra + Receta Gelatina Fresa',
                    'Sigue comiendo Gelatina',
                ],
            ],

            [
                'slug'  => 'indicaciones_frutos_secos',
                'name'  => 'Indicaciones Frutos Secos',
                'group' => 'indicaciones',
                'items' => [
                    'Activación',
                    'Incrementa su Consumo y su Variedad',
                    'No Cacahuetes',
                    'No Pipas de girasol Ni Anacardos',
                    'No Pipas de Girasol Ni Cacahuetes',
                    'Por ahora Evitar comer o muy triturados',
                    'Toma de Vez en cuando te viene bien',
                ],
            ],

            [
                'slug'  => 'indicaciones_agua',
                'name'  => 'Indicaciones Agua',
                'group' => 'indicaciones',
                'items' => [
                    'Agua de Coco',
                    'Agua de Mar 100% Ibiza y Formentera',
                ],
            ],

            [
                'slug'  => 'indicaciones_cafe_infusiones',
                'name'  => 'Indicaciones Café e Infusiones',
                'group' => 'indicaciones',
                'items' => [
                    'Bebe si te apetece cerveza sin alcohol',
                    'Bebe si te apetece cerveza sin alcohol y sin gluten',
                    'Bulletproof coffee achicoria',
                    'Bulletproof coffee café',
                    'Bulletproof coffee descafeinado',
                    'Bulletproof coffee Todos',
                    'Café por Achicoria',
                    'Cerveza sin gluten',
                    'Dejar Cerveza Aunque sea sin Alcohol',
                    'Descafeinado por Achicoria',
                    'Evita Alcohol por la noche',
                    'Evita Alcohol por la noche al menos los Destilados',
                    'Evita Tomar Coca-Cola o cualquier refresco industrial',
                    'Kombucha',
                    'Leche dorada + link',
                    'Melisa + Valeriana + Pasiflora antes de Dormir',
                    'Reduce el Café 1 Máx por día y siempre por la mañana',
                ],
            ],

            [
                'slug'  => 'indicaciones_encurtidos',
                'name'  => 'Indicaciones Encurtidos y Salsas',
                'group' => 'indicaciones',
                'items' => [
                    'Algo de Encurtidos',
                    'Aumenta el consumo de Fermentados',
                    'Evita el consumo de Fermentados',
                    'No tomes Vinagre de momento',
                    'Sigue con los Encurtidos',
                    'Toma un chupito de vinagre de manzana sin filtrar antes de la comida',
                    'Utiliza Sal Marina sin Refinar con Algas de la marca Herbamare',
                ],
            ],

            [
                'slug'  => 'indicaciones_algas',
                'name'  => 'Indicaciones Algas',
                'group' => 'indicaciones',
                'items' => [
                    'Consumir en Algunas Ocasiones',
                    'No hace falta mucha cantidad distinta variedad',
                    'No tomes algas por ahora',
                    'Solo consume por ahora Chrorella',
                    'Utiliza Sal Marina sin Refinar con Algas marca Herbamare',
                ],
            ],

            [
                'slug'  => 'indicaciones_especias',
                'name'  => 'Indicaciones Especias',
                'group' => 'indicaciones',
                'items' => [
                    'Tomar Quelantes',
                    'Tomar Quelantes - No Algas',
                    'Tomar Quelantes - No Setas',
                    'Tomar Quelantes - No Vinagre',
                ],
            ],

            [
                'slug'  => 'indicaciones_semillas',
                'name'  => 'Indicaciones Semillas',
                'group' => 'indicaciones',
                'items' => [
                    'No consumirlas de manera habitual',
                    'Puding de Chía',
                ],
            ],

            [
                'slug'  => 'indicaciones_picantes',
                'name'  => 'Indicaciones Picantes',
                'group' => 'indicaciones',
                'items' => [
                    'Se aconseja tomar alimentos como el wasabi la guindilla la mostaza',
                ],
            ],

            // ─── Group: licuados ──────────────────────────────────────────

            [
                'slug'  => 'licuados',
                'name'  => 'Licuados',
                'group' => 'licuados',
                'items' => [
                    'AntiHipertensivos',
                    'AntiHistamínicos',
                    'AntiOxidantes',
                    'AntiOxidantes y Detoxificantes',
                    'Bajar el Ácido Úrico',
                    'Bajar Estrógenos',
                    'Bajar la Glucemia',
                    'Circulación',
                    'Con Fruta y Tubérculos',
                    'Control Ansiedad',
                    'Cuidado de la piel',
                    'Detox',
                    'Drenaje Linfático',
                    'Estreñimiento',
                    'Pulmón',
                    'Riñón',
                    'Sin Fruta ni Tubérculos',
                ],
            ],

            // ─── Group: analitica ─────────────────────────────────────────

            [
                'slug'  => 'parametros_analitica',
                'name'  => 'Parámetros Analítica',
                'group' => 'analitica',
                'items' => [
                    '25 (OH)D3',
                    'Ácido Úrico',
                    'Amilasa',
                    'Anti TPO',
                    'Anticuerpos antinucleares (ANA)',
                    'Antimulleriana',
                    'Antitiroglobulina',
                    'Apo A',
                    'Apo B',
                    'Bilirrubina',
                    'Colesterol total',
                    'Creatinina',
                    'DAO',
                    'Dímero D',
                    'Estradiol',
                    'Ferritina',
                    'Fibrinógeno',
                    'Filtrado Glomerular',
                    'Folato',
                    'FSH',
                    'Glucosa',
                    'HDL',
                    'Hierro',
                    'Histamina basal',
                    'Homocisteína',
                    'Insulina',
                    'LDH',
                    'LDL',
                    'LH',
                    'Lp (a)',
                    'Magnesio',
                    'PCR ultrasensible',
                    'Progesterona',
                    'Proteinograma',
                    'Sodio',
                    'T3 libre',
                    'T4 libre',
                    'Testosterona',
                    'Tiempo de protrombina',
                    'Tiempo parcial de tromboplastina',
                    'Transaminasas',
                    'Triglicéridos',
                    'TSH',
                    'Vitamina B12',
                    'Zinc',
                ],
            ],

            // ─── Group: referencias ───────────────────────────────────────

            [
                'slug'  => 'referencias_bibliograficas',
                'name'  => 'Referencias Bibliográficas',
                'group' => 'referencias',
                'items' => [
                    'Ref C',
                    'Ref Psoriasis',
                ],
            ],
        ];
    }
}
