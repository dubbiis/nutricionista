<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReportSelection extends Model
{
    protected $fillable = [
        'report_id',
        'catalog_item_id',
    ];

    public function report()
    {
        return $this->belongsTo(Report::class);
    }

    public function catalogItem()
    {
        return $this->belongsTo(CatalogItem::class);
    }
}
