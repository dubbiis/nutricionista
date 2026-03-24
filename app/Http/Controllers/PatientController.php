<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Log;

class PatientController extends Controller
{
    public function index()
    {
        Log::info('PatientController@index');
        $patients = Patient::withCount('reports')
            ->orderBy('updated_at', 'desc')
            ->paginate(20);

        return Inertia::render('Patients/Index', [
            'patients' => $patients,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'visit_count' => 'integer|min:0',
        ]);

        $patient = Patient::create($validated);
        Log::info('Paciente creado: ' . $patient->id);

        return back()->with('success', 'Paciente creado correctamente.');
    }

    public function show(Patient $patient)
    {
        $patient->load(['reports' => fn ($q) => $q->orderBy('created_at', 'desc')]);

        return Inertia::render('Patients/Show', [
            'patient' => $patient,
        ]);
    }

    public function update(Request $request, Patient $patient)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'visit_count' => 'integer|min:0',
        ]);

        $patient->update($validated);

        return back()->with('success', 'Paciente actualizado.');
    }

    public function destroy(Patient $patient)
    {
        $patient->delete();
        Log::info('Paciente eliminado: ' . $patient->id);

        return redirect()->route('patients.index')->with('success', 'Paciente eliminado.');
    }

    public function search(Request $request)
    {
        $q = $request->get('q', '');
        if (strlen($q) < 2) {
            return response()->json([]);
        }

        $patients = Patient::where('name', 'like', "%{$q}%")
            ->orWhere('surname', 'like', "%{$q}%")
            ->orWhere('email', 'like', "%{$q}%")
            ->limit(10)
            ->get(['id', 'name', 'surname', 'email', 'visit_count']);

        return response()->json($patients);
    }
}
