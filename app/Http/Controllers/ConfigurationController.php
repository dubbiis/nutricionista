<?php

namespace App\Http\Controllers;

use App\Models\Configuration;
use Illuminate\Http\Request;

class ConfigurationController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            $request->user()->configurations()->orderBy('name')->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'data' => 'required|array',
        ]);

        $config = $request->user()->configurations()->create($validated);

        return response()->json($config, 201);
    }

    public function show(Configuration $configuration)
    {
        return response()->json($configuration);
    }

    public function destroy(Configuration $configuration)
    {
        $configuration->delete();

        return response()->json(['message' => 'Configuración eliminada.']);
    }
}
