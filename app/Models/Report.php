<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'patient_name',
        'patient_surname',
        'patient_email',
        'pathology',
        'gender',
        'recipient',
        'notes',
    ];

    public function catalogItems()
    {
        return $this->belongsToMany(CatalogItem::class, 'report_selections');
    }

    public function foodActions()
    {
        return $this->hasMany(ReportFoodAction::class);
    }
}
