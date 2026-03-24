<?php

namespace App\Http\Controllers;

use App\Models\CatalogSection;
use App\Models\Food;
use App\Models\FoodCategory;
use App\Models\FoodTableType;
use App\Models\Patient;
use App\Models\Report;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Log;

class ReportController extends Controller
{
    public function dashboard()
    {
        Log::info('ReportController@dashboard');

        $recentReports = Report::with('patient')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        $stats = [
            'totalPatients' => Patient::count(),
            'totalReports' => Report::count(),
            'lastReport' => $recentReports->first(),
        ];

        return Inertia::render('Dashboard', [
            'recentReports' => $recentReports,
            'stats' => $stats,
        ]);
    }

    public function create(Request $request)
    {
        Log::info('ReportController@create');

        $patient = $request->has('patient_id')
            ? Patient::find($request->patient_id)
            : null;

        return Inertia::render('Reports/Create', [
            'patient' => $patient,
            'catalogs' => CatalogSection::with('items')->orderBy('sort_order')->get()->groupBy('group'),
            'foods' => Food::where('is_active', true)->orderBy('food_type')->orderBy('name')->get(),
            'foodCategories' => FoodCategory::orderBy('sort_order')->get(),
            'foodTableTypes' => FoodTableType::orderBy('sort_order')->get(),
            'configurations' => $request->user()->configurations()->orderBy('name')->get(),
            'settings' => Setting::pluck('value', 'key'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'pathology' => 'nullable|string',
            'gender' => 'required|in:masculino,femenino',
            'recipient' => 'required|in:entrevistado,no_entrevistado',
            'notes' => 'nullable|string',
            'catalog_selections' => 'array',
            'catalog_selections.*' => 'exists:catalog_items,id',
            'food_actions' => 'array',
        ]);

        $report = Report::create([
            'patient_id' => $validated['patient_id'],
            'pathology' => $validated['pathology'] ?? null,
            'gender' => $validated['gender'],
            'recipient' => $validated['recipient'],
            'notes' => $validated['notes'] ?? null,
        ]);

        if (!empty($validated['catalog_selections'])) {
            $report->catalogItems()->sync($validated['catalog_selections']);
        }

        if (!empty($validated['food_actions'])) {
            foreach ($validated['food_actions'] as $action) {
                $report->foodActions()->create($action);
            }
        }

        $patient = Patient::find($validated['patient_id']);
        $patient->increment('visit_count');

        Log::info('Informe creado: ' . $report->id . ' para paciente: ' . $patient->id);

        return redirect()->route('reports.show', $report)
            ->with('success', 'Informe guardado correctamente.');
    }

    public function show(Report $report)
    {
        $report->load(['patient', 'catalogItems.section', 'foodActions']);

        return Inertia::render('Reports/Show', [
            'report' => $report,
        ]);
    }

    public function edit(Report $report)
    {
        $report->load(['patient', 'catalogItems', 'foodActions']);

        return Inertia::render('Reports/Edit', [
            'report' => $report,
            'patient' => $report->patient,
            'catalogs' => CatalogSection::with('items')->orderBy('sort_order')->get()->groupBy('group'),
            'foods' => Food::where('is_active', true)->orderBy('food_type')->orderBy('name')->get(),
            'foodCategories' => FoodCategory::orderBy('sort_order')->get(),
            'foodTableTypes' => FoodTableType::orderBy('sort_order')->get(),
            'configurations' => request()->user()->configurations()->orderBy('name')->get(),
            'settings' => Setting::pluck('value', 'key'),
        ]);
    }

    public function update(Request $request, Report $report)
    {
        $validated = $request->validate([
            'pathology' => 'nullable|string',
            'gender' => 'required|in:masculino,femenino',
            'recipient' => 'required|in:entrevistado,no_entrevistado',
            'notes' => 'nullable|string',
            'catalog_selections' => 'array',
            'catalog_selections.*' => 'exists:catalog_items,id',
            'food_actions' => 'array',
        ]);

        $report->update([
            'pathology' => $validated['pathology'] ?? null,
            'gender' => $validated['gender'],
            'recipient' => $validated['recipient'],
            'notes' => $validated['notes'] ?? null,
        ]);

        $report->catalogItems()->sync($validated['catalog_selections'] ?? []);

        $report->foodActions()->delete();
        if (!empty($validated['food_actions'])) {
            foreach ($validated['food_actions'] as $action) {
                $report->foodActions()->create($action);
            }
        }

        Log::info('Informe actualizado: ' . $report->id);

        return redirect()->route('reports.show', $report)
            ->with('success', 'Informe actualizado.');
    }

    public function pdf(Report $report)
    {
        Log::info('ReportController@pdf - Generando PDF para informe #' . $report->id);

        $generator = new \App\Services\PdfGenerator();
        $pdf = $generator->generate($report);

        $surname = $report->patient->surname ?? 'paciente';
        $date = date('Y-m-d', strtotime($report->created_at));
        $filename = 'informe_' . $surname . '_' . $date . '.pdf';

        return $pdf->download($filename);
    }
}
