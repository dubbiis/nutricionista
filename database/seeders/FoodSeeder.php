<?php

namespace Database\Seeders;

use App\Models\Food;
use App\Models\FoodCategory;
use App\Models\FoodTableType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class FoodSeeder extends Seeder
{
    public function run(): void
    {
        // ─── Food Categories ────────────────────────────────────────────
        $categories = $this->getCategories();
        $order = 1;

        foreach ($categories as $name) {
            FoodCategory::create([
                'name'       => $name,
                'sort_order' => $order++,
            ]);
        }

        Log::info("FoodSeeder: {$order} categorías creadas.");

        // ─── Load JSON data ─────────────────────────────────────────────
        $jsonPath = database_path('../docs/foods_data.json');
        $jsonData = json_decode(file_get_contents($jsonPath), true);

        if (empty($jsonData)) {
            Log::error("FoodSeeder: No se pudo leer o parsear el JSON en {$jsonPath}");
            return;
        }

        Log::info("FoodSeeder: " . count($jsonData) . " alimentos encontrados en JSON.");

        // ─── Cache FoodTableType IDs by name ────────────────────────────
        $foodTableTypes = FoodTableType::pluck('id', 'name');

        // ─── Cache FoodCategory IDs by name ─────────────────────────────
        $foodCategories = FoodCategory::pluck('id', 'name');

        // ─── Create Foods ───────────────────────────────────────────────
        $foodOrder = 1;

        foreach ($jsonData as $entry) {
            $foodTableTypeId = $foodTableTypes[$entry['food_type']] ?? null;

            if ($foodTableTypeId === null) {
                Log::error("FoodSeeder: FoodTableType '{$entry['food_type']}' no encontrado para alimento '{$entry['name']}'");
            }

            $isActive = ($entry['iv'] ?? 0) == 1;

            $food = Food::create([
                'name'              => $entry['name'],
                'food_type'         => $entry['food_type'],
                'sort_order'        => $foodOrder++,
                'is_active'         => $isActive,
                'initial_visible'   => (bool) ($entry['iv'] ?? 0),
                'initial_frequency' => $entry['ifc'] ?? 0,
                'initial_emphasis'  => (bool) ($entry['ie'] ?? 0),
                'food_table_type_id' => $foodTableTypeId,
            ]);

            // ─── Pivot: food_category_food ──────────────────────────────
            if (!empty($entry['cats'])) {
                $categoryIds = [];

                foreach ($entry['cats'] as $catName) {
                    if (isset($foodCategories[$catName])) {
                        $categoryIds[] = $foodCategories[$catName];
                    } else {
                        Log::error("FoodSeeder: Categoría '{$catName}' no encontrada para alimento '{$entry['name']}'");
                    }
                }

                if (!empty($categoryIds)) {
                    $food->foodCategories()->attach($categoryIds);
                }
            }
        }

        Log::info("FoodSeeder: {$foodOrder} alimentos creados con sus categorías.");
    }

    private function getCategories(): array
    {
        return [
            // Categorías generales de alimentos
            'Frutas Aptas Sin Fructosa',
            'Algas',
            'Todas las Legumbres menos soja y cacahuete',
            'Quelantes',
            'Frutos rojos',
            'CG MEDIA-ALTA',
            'CG MEDIA',
            'CG BAJA',
            'ARROZ',
            'CEREALES',
            'PASTA',
            'GLUTEN',
            'INHIBEN O RETRASAN LA FASE I',
            'MEJORAR FASE 1',
            'DESCOMPONER HIF-1 ALFA',
            'FRENAR AROMATASA',
            'FAVORECEN EVACUACIÓN',
            'BRASSICAS',
            'BAJAR PURINAS - ACIDO ÚRICO',
            'MEJORAR FUNCIÓN HEPÁTICA DE LA BILIS',
            'SOLANÁCEAS',
            'RICOS EN ENZIMAS DIGESTIVAS',
            'ESTREÑIMIENTO',
            'ESTREÑIMIENTO (FRUTAS)',
            'ÁCIDOS',
            'ALCALINIZANTES',
            'AMARGOS Y DEPURATIVOS',
            'ANTICOAGULANTES',
            'ANTIHIPERTENSIVOS',
            'ANTIINFLAMATORIOS',
            'ASTRINGENTES',
            'COLAGOGOS',
            'DETOX Y DEPURATIVOS',
            'DIURÉTICOS',
            'FERMENTADOS',
            'INFLAMATORIOS',
            'PARA INCREMENTAR PLAQUETAS',
            'PRECURSORES DE NADH',
            'RICOS EN VITAMINA A (retinol)',
            'RICOS EN VITAMINA B6 (piridoxina)',
            'RICOS EN VITAMINA B9 (ác. fólico)',
            'RICOS EN VITAMINA B12 (cianocobalamina)',
            'ALIMENTOS RICOS EN VITAMINA C (ác. ascórbico)',
            'RICOS EN VITAMINA D (calciferol)',
            'RICOS EN VITAMINA E',
            'RICOS EN VITAMINA K1 (filoquinona)',
            'RICOS EN VITAMINA K2 (menaquinona)',
            'RICOS EN ANTIOXIDANTES',
            'RICOS EN ARGININA',
            'RICOS EN AZUFRE',
            'RICOS EN BETAINA',
            'RICOS EN BIOTINA',
            'RICO EN BORO',
            'RICO EN CALCIO',
            'RICOS EN CARNITINA',
            'RICOS EN CISTEÍNA',
            'RICOS EN COENZIMA Q10',
            'RICOS EN COLESTEROL',
            'RICOS EN COLINA',
            'RICOS EN CREATINA',
            'RICOS EN FENILALANINA',
            'RICOS EN FIBRA SOLUBLE',
            'RICOS EN FIBRA INSOLUBLE',
            'RICOS EN FITOESTRÓGENOS',
            'RICOS EN FLAVONOIDES',
            'RICOS EN FÓSFORO',
            'RICOS/PRECURSORES GABA',
            'RICOS EN GLICINA',
            'RICOS EN GLUTATIÓN',
            'RICOS EN HIERRO',
            'RICOS EN INULINA',
            'RICOS EN LICOPENO',
            'RICOS EN LISINA',
            'RICOS EN MAGNESIO',
            'RICOS EN MANGANESO',
            'RICOS EN METIONINA',
            'RICOS EN MOLIBDENO',
            'RICOS EN NÍQUEL',
            'RICOS EN OXALATOS',
            'RICOS EN POTASIO',
            'RICOS EN RESVERATROL',
            'RICOS EN RIBOSA',
            'RICOS EN RUTINA',
            'RICOS EN SELENIO',
            'RICOS EN SULFITOS',
            'RICOS EN TIROSINA',
            'RICOS EN TRIPTÓFANO',
            'RICOS EN YODO',
            'RICOS EN ZINC',
            'SUBEN ESTRÓGENOS',
            'BAJAN ESTRÓGENOS',
            'SUBEN PROGESTERONA',
            'ALTOS EN HISTAMINA',
            'BAJOS EN HISTAMINA',
            'AUMENTAN TESTOSTERONA',
            'BUENAS PARA EL RIÑÓN',
            'Fruta',
            'FRUTA EVITAR PIEDRAS RIÑÓN',
            'VERDURA CON MUCHOS HIDRATOS',
            'VERDURA CON MUCHA FIBRA',
            'VERDURA POBRE EN HIDRATOS',
            'PARA BAJAR GLUCOSA',
            'VERDURA MÁS FLATULENTA',
            'VERDURA CON MAYOR CARGA GLUCÉMICA',
            'PARA BAJAR COLESTEROL',
            'BAJAR TESTOSTERONA',
            'QUE GENERAN OXALATO CÁLCICO',
            'CON ALTA CARGA GLICÉMICA',
            'CARNE DE MAMÍFERO',
            'CARNE ROJA',
            'CARNE DE MONTE',
            'SETAS',
            'PESCADO AZUL GRANDE',
            'PESCADO AZUL PEQUEÑO',
            'PESCADO RICO EN OMEGA 3',
            'ALGAS CON POCA FIBRA',

            // Categorías de infusiones
            'Infusiones ACELERAR FASE II',
            'Infusiones ACNÉ',
            'Infusiones ACÚFENOS',
            'Infusiones ALCOHOLISMO',
            'Infusiones ALERGIAS',
            'Infusiones ANEMIA',
            'Infusiones ANISAKIASIS',
            'Infusiones ANSIOLÍTICAS',
            'Infusiones ANTIINFLAMATORIAS',
            'Infusiones ANTIHISTAMÍNICA',
            'Infusiones ANTIMICROBIANA',
            'Infusiones ANTIOXIDANTES',
            'Infusiones ARTRITIS',
            'Infusiones BAJAR ÁCIDO ÚRICO',
            'Infusiones BAJAR COLESTEROL',
            'Infusiones BAJAR ESTRÓGENOS Ortiga Verde',
            'Infusiones BAJAR ESTRÓGENOS Canela',
            'Infusiones BAJAR ESTRÓGENOS Sin Canela histaminosis',
            'Infusiones BAJAR ESTRÓGENOS cardo mariano sueño',
            'Infusiones BAJAR GLUCOSA',
            'Infusiones BAJAR TRIGLICÉRIDOS',
            'Infusiones CÁLCULOS BILIARES',
            'Infusiones CANDIDIASIS',
            'Infusiones CIRCULACIÓN',
            'Infusiones CISTITIS',
            'Infusiones COLON IRRITABLE',
            'Infusiones CONCENTRACIÓN',
            'Infusiones CONCILIAR EL SUEÑO Y LA ANSIEDAD',
            'Infusiones DERMATITIS ATÓPICA',
            'Infusiones DETOXIFICANTES',
            'Infusiones DIABETES',
            'Infusiones DIARREA',
            'Infusiones DIURÉTICAS',
            'Infusiones DISPEPSIA',
            'Infusiones EDEMAS',
            'Infusiones EMBARAZO (APTAS)',
            'Infusiones EMBARAZO (NO APTAS)',
            'Infusiones ESTREÑIMIENTO',
            'Infusiones EXPECTORANTES',
            'Infusiones FAVORECER LA FUNCIONALIDAD HEPÁTICA',
            'Infusiones FLATULENCIAS',
            'Infusiones GARGANTA',
            'Infusiones GASES',
            'Infusiones GASTRITIS',
            'Infusiones HEMORROIDES',
            'Infusiones HEPATITIS',
            'Infusiones HERNIA DE HIATO',
            'Infusiones HINCHAZÓN',
            'Infusiones HIPERTENSIÓN',
            'Infusiones HIPOTENSIÓN',
            'Infusiones HIPOTIROIDISMO',
            'Infusiones INAPETENCIA (FALTA DE APETITO O ANOREXIA)',
            'Infusiones INHIBEN O RETRASAN LA FASE I',
            'Infusiones HISTAMINOSIS',
            'Infusiones MENOPAUSIA y bochornos',
            'Infusiones MENSTRUACIÓN ALTERACIONES',
            'Infusiones MEJORAR LA PIEL',
            'Infusiones MEJORAR FUNCIÓN DIGESTIVA',
            'Infusiones MEJORAR FUNCIÓN RIÑÓN',
            'Infusiones MIGRAÑA',
            'Infusiones OSTEOPOROSIS',
            'Infusiones PARÁSITOS',
            'Infusiones PARA DESCOMPONER HIF-1 ALFA',
            'Infusiones PERDER PESO',
            'Infusiones PRÓSTATA',
            'Infusiones PROTECTORAS GÁSTRICAS',
            'Infusiones PROTECTORAS INTESTINALES',
            'Infusiones QUITAR PIEDRAS DEL RIÑÓN',
            'Infusiones SISTEMA INMUNE',
            'Infusiones SUBIR ESTRÓGENOS',
            'Infusiones SUBIR PROGESTERONA',
            'Infusiones URTICARIA',
            'Infusiones VESÍCULA BILIAR INSUFICIENCIA',
            'Infusiones VEJIGA',
            'Infusiones Base',
        ];
    }
}
