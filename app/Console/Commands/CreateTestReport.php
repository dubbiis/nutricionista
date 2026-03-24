<?php

namespace App\Console\Commands;

use App\Models\CatalogSection;
use App\Models\Report;
use Illuminate\Console\Command;

class CreateTestReport extends Command
{
    protected $signature = 'app:create-test-report';
    protected $description = 'Crea un informe de prueba con datos variados';

    public function handle()
    {
        $report = Report::create([
            'patient_name' => 'Rosa María',
            'patient_surname' => 'García López',
            'patient_email' => 'rosa@example.com',
            'pathology' => 'Paciente de 42 años con hipotiroidismo autoinmune (Hashimoto), resistencia a la insulina y déficit de vitamina D. Presenta fatiga crónica, dificultad para perder peso y problemas digestivos (hinchazón, gases). Analítica reciente muestra TSH elevada, ferritina baja y homocisteína alta.',
            'gender' => 'femenino',
            'recipient' => 'entrevistado',
            'notes' => 'Rosa María debe priorizar el ejercicio de fuerza 2-3 veces por semana y caminar 40 min diarios después de comer. Revisión en 2 meses con nueva analítica.',
        ]);

        $slugs = [
            'estrategias_hormeticas' => 5,
            'estrategias_evidencia' => 4,
            'indicaciones_pescados' => 3,
            'indicaciones_carnes' => 3,
            'indicaciones_verduras' => 2,
            'indicaciones_fruta' => 2,
            'indicaciones_legumbres' => 1,
            'indicaciones_cereales' => 2,
            'licuados' => 3,
            'suplementacion_habitual' => 4,
            'suplementacion' => 5,
            'parametros_analitica' => 8,
            'referencias_bibliograficas' => 2,
        ];

        $selections = [];
        foreach ($slugs as $slug => $limit) {
            $section = CatalogSection::where('slug', $slug)->first();
            if ($section) {
                $ids = $section->items()->limit($limit)->pluck('id')->toArray();
                $selections = array_merge($selections, $ids);
            }
        }

        $report->catalogItems()->sync($selections);

        $report->foodActions()->createMany([
            ['source_type' => 'category', 'source_id' => 1, 'frequency' => 'aumentar', 'emphasis' => 'moderado'],
            ['source_type' => 'category', 'source_id' => 5, 'frequency' => 'aumentar', 'emphasis' => 'leve'],
            ['source_type' => 'food', 'source_id' => 1, 'frequency' => 'aumentar', 'emphasis' => 'alto'],
            ['source_type' => 'food', 'source_id' => 10, 'frequency' => 'disminuir', 'emphasis' => 'sin_enfasis'],
        ]);

        $this->info("Informe creado: ID {$report->id} con " . count($selections) . " selecciones y 4 food actions");
        $this->info("Ver: /reports/{$report->id}");
        $this->info("PDF: /reports/{$report->id}/pdf");
    }
}
