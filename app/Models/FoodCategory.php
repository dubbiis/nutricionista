<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FoodCategory extends Model
{
    protected $fillable = [
        'name',
        'sort_order',
    ];

    public function foods()
    {
        return $this->belongsToMany(Food::class, 'food_category_food');
    }
}
