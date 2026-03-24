<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('food_table_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->tinyInteger('frequency_count')->default(2);
            $table->string('fc0_label')->nullable();
            $table->string('fc1_label')->nullable();
            $table->string('fc2_label')->nullable();
            $table->string('fc3_label')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('food_table_types');
    }
};
