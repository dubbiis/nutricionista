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
        Schema::create('report_food_actions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('report_id')->constrained()->cascadeOnDelete();
            $table->enum('source_type', ['category', 'food']);
            $table->unsignedBigInteger('source_id');
            $table->enum('frequency', ['sin_cambios', 'aumentar', 'disminuir', 'eliminar'])->default('sin_cambios');
            $table->enum('emphasis', ['sin_enfasis', 'leve', 'moderado', 'alto'])->default('sin_enfasis');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_food_actions');
    }
};
