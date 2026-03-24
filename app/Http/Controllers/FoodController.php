<?php

namespace App\Http\Controllers;

use App\Models\Food;
use App\Models\FoodCategory;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    public function index(Request $request)
    {
        $query = Food::query();

        if ($request->has('q') && strlen($request->q) >= 2) {
            $query->where('name', 'like', '%' . $request->q . '%');
        }

        if ($request->has('active_only') && $request->active_only) {
            $query->where('is_active', true);
        }

        if ($request->has('food_type')) {
            $query->where('food_type', $request->food_type);
        }

        return response()->json(
            $query->orderBy('food_type')->orderBy('name')->get()
        );
    }

    public function categories()
    {
        return response()->json(
            FoodCategory::orderBy('sort_order')->get()
        );
    }

    public function toggleActive(Food $food)
    {
        $food->update(['is_active' => !$food->is_active]);

        return response()->json([
            'id' => $food->id,
            'is_active' => $food->is_active,
        ]);
    }
}
