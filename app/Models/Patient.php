<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'name',
        'surname',
        'email',
        'visit_count',
    ];

    public function reports()
    {
        return $this->hasMany(Report::class);
    }
}
