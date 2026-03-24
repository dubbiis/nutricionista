<?php

namespace App\Services;

use App\Models\Report;
use App\Models\Setting;
use App\Models\Food;
use App\Models\FoodCategory;
use App\Models\FoodTableType;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Log;

class PdfGenerator
{
    /**
     * Genera el PDF de un informe nutricional.
     */
    public function generate(Report $report)
    {
        Log::info('PdfGenerator: generando PDF para informe #' . $report->id);

        $report->load(['catalogItems.section', 'foodActions']);

        $settings = Setting::pluck('value', 'key');

        // Obtener tipos de tabla de alimentos ordenados
        $foodTableTypes = FoodTableType::orderBy('sort_order')->get();

        // Obtener todos los alimentos activos con su tipo de tabla
        $allFoods = Food::where('is_active', true)
            ->orderBy('name')
            ->get();

        // Indexar acciones por food_id y por category_id para acceso rápido
        $foodActionsByFood = [];
        $foodActionsByCategory = [];
        foreach ($report->foodActions as $action) {
            if ($action->source_type === 'food') {
                $foodActionsByFood[$action->source_id] = $action;
            } elseif ($action->source_type === 'category') {
                $foodActionsByCategory[$action->source_id] = $action;
            }
        }

        // Precargar categorías de los alimentos para resolver acciones de categoría
        $allFoods->load('foodCategories');

        // Procesar alimentos: aplicar modificaciones de frecuencia y énfasis
        $processedFoods = $allFoods->map(function ($food) use ($foodActionsByFood, $foodActionsByCategory) {
            $frequency = intval($food->initial_frequency);
            $emphasis = $food->initial_emphasis;

            // Primero aplicar acciones de categoría (pueden ser sobreescritas por acciones directas)
            foreach ($food->foodCategories as $cat) {
                if (isset($foodActionsByCategory[$cat->id])) {
                    $catAction = $foodActionsByCategory[$cat->id];
                    $frequency = $this->applyFrequencyChange($frequency, $catAction->frequency);
                    $emphasis = $this->applyEmphasis($emphasis, $catAction->emphasis);
                }
            }

            // Después aplicar acción directa sobre el alimento (tiene prioridad)
            if (isset($foodActionsByFood[$food->id])) {
                $directAction = $foodActionsByFood[$food->id];
                $frequency = $this->applyFrequencyChange($frequency, $directAction->frequency);
                $emphasis = $this->applyEmphasis($emphasis, $directAction->emphasis);
            }

            return (object) [
                'id' => $food->id,
                'name' => $food->name,
                'food_type' => $food->food_type,
                'food_table_type_id' => $food->food_table_type_id,
                'frequency' => max(0, $frequency),
                'emphasis' => $emphasis,
                'eliminated' => isset($foodActionsByFood[$food->id])
                    && $foodActionsByFood[$food->id]->frequency === 'eliminar',
            ];
        })->filter(fn($f) => !$f->eliminated);

        // Agrupar alimentos procesados por food_table_type_id
        $foodsByTableType = $processedFoods->groupBy('food_table_type_id');

        // Agrupar selecciones de catálogo por grupo de sección
        $catalogByGroup = [];
        foreach ($report->catalogItems as $item) {
            $group = $item->section->group;
            $sectionName = $item->section->name;
            if (!isset($catalogByGroup[$group])) {
                $catalogByGroup[$group] = [];
            }
            if (!isset($catalogByGroup[$group][$sectionName])) {
                $catalogByGroup[$group][$sectionName] = [];
            }
            $catalogByGroup[$group][$sectionName][] = $item->label;
        }

        $pdf = Pdf::loadView('pdf.report', [
            'report' => $report,
            'settings' => $settings,
            'foodTableTypes' => $foodTableTypes,
            'foodsByTableType' => $foodsByTableType,
            'catalogByGroup' => $catalogByGroup,
        ]);

        $pdf->setPaper('A4', 'portrait');

        Log::info('PdfGenerator: PDF generado correctamente para informe #' . $report->id);

        return $pdf;
    }

    /**
     * Aplica un cambio de frecuencia al valor base.
     */
    private function applyFrequencyChange(int $currentFrequency, string $change): int
    {
        return match ($change) {
            'aumentar' => $currentFrequency + 1,
            'disminuir' => $currentFrequency - 1,
            'eliminar' => -1,
            default => $currentFrequency, // sin_cambios
        };
    }

    /**
     * Aplica el énfasis según la acción.
     */
    private function applyEmphasis(bool $currentEmphasis, string $emphasisAction): bool
    {
        return match ($emphasisAction) {
            'leve', 'moderado', 'alto' => true,
            default => $currentEmphasis, // sin_enfasis mantiene el valor original
        };
    }
}
