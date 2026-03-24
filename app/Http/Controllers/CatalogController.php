<?php

namespace App\Http\Controllers;

use App\Models\CatalogItem;
use App\Models\CatalogSection;
use Illuminate\Http\Request;

class CatalogController extends Controller
{
    public function items(string $sectionSlug)
    {
        $section = CatalogSection::where('slug', $sectionSlug)
            ->with(['items' => fn ($q) => $q->orderBy('sort_order')])
            ->firstOrFail();

        return response()->json($section->items);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'catalog_section_id' => 'required|exists:catalog_sections,id',
            'label' => 'required|string|max:500',
        ]);

        $maxOrder = CatalogItem::where('catalog_section_id', $validated['catalog_section_id'])
            ->max('sort_order') ?? 0;

        $item = CatalogItem::create([
            ...$validated,
            'sort_order' => $maxOrder + 1,
        ]);

        return response()->json($item, 201);
    }

    public function destroy(CatalogItem $catalogItem)
    {
        $catalogItem->delete();

        return response()->json(['message' => 'Eliminado.']);
    }
}
