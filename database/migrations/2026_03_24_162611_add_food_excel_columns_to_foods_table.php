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
        Schema::table('foods', function (Blueprint $table) {
            $table->boolean('is_active')->default(true)->after('sort_order');
            $table->boolean('initial_visible')->default(true)->after('is_active');
            $table->tinyInteger('initial_frequency')->default(0)->after('initial_visible');
            $table->boolean('initial_emphasis')->default(false)->after('initial_frequency');
            $table->foreignId('food_table_type_id')->nullable()->constrained()->nullOnDelete()->after('initial_emphasis');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('foods', function (Blueprint $table) {
            $table->dropForeign(['food_table_type_id']);
            $table->dropColumn(['is_active', 'initial_visible', 'initial_frequency', 'initial_emphasis', 'food_table_type_id']);
        });
    }
};
