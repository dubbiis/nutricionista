<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    protected $table = 'foods';

    protected $fillable = [
        'name',
        'food_type',
        'sort_order',
        'is_active',
        'initial_visible',
        'initial_frequency',
        'initial_emphasis',
        'food_table_type_id',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'initial_visible' => 'boolean',
        'initial_emphasis' => 'boolean',
    ];

    public function foodTableType()
    {
        return $this->belongsTo(FoodTableType::class);
    }

    public function foodCategories()
    {
        return $this->belongsToMany(FoodCategory::class, 'food_category_food');
    }
}
