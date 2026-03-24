<?php

namespace App\Http\Controllers;

use App\Models\CatalogSection;
use App\Models\Food;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render('Settings/Index', [
            'settings' => Setting::pluck('value', 'key'),
            'catalogSections' => CatalogSection::with('items')->orderBy('sort_order')->get(),
            'foods' => Food::orderBy('food_type')->orderBy('name')->get(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array',
            'settings.*.key' => 'required|string',
            'settings.*.value' => 'nullable|string',
        ]);

        foreach ($validated['settings'] as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                ['value' => $setting['value']],
            );
        }

        return back()->with('success', 'Ajustes guardados.');
    }
}
