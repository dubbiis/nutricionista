<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CatalogSection extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'group',
        'sort_order',
    ];

    public function catalogItems()
    {
        return $this->hasMany(CatalogItem::class);
    }

    public function items()
    {
        return $this->hasMany(CatalogItem::class);
    }
}
