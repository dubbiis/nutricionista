<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReportFoodAction extends Model
{
    protected $fillable = [
        'report_id',
        'source_type',
        'source_id',
        'frequency',
        'emphasis',
    ];

    public function report()
    {
        return $this->belongsTo(Report::class);
    }
}
