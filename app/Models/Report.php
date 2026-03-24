<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'patient_id',
        'pathology',
        'gender',
        'recipient',
        'notes',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function catalogItems()
    {
        return $this->belongsToMany(CatalogItem::class, 'report_selections');
    }

    public function reportFoodActions()
    {
        return $this->hasMany(ReportFoodAction::class);
    }

    public function foodActions()
    {
        return $this->hasMany(ReportFoodAction::class);
    }
}
