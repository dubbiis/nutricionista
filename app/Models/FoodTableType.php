<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FoodTableType extends Model
{
    protected $fillable = ['name', 'frequency_count', 'fc0_label', 'fc1_label', 'fc2_label', 'fc3_label', 'sort_order'];

    public function foods()
    {
        return $this->hasMany(Food::class);
    }
}
