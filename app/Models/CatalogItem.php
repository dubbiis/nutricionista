<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CatalogItem extends Model
{
    protected $fillable = [
        'catalog_section_id',
        'label',
        'sort_order',
    ];

    public function catalogSection()
    {
        return $this->belongsTo(CatalogSection::class);
    }

    public function reports()
    {
        return $this->belongsToMany(Report::class, 'report_selections');
    }
}
