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
        Schema::table('reports', function (Blueprint $table) {
            $table->dropForeign(['patient_id']);
            $table->dropColumn('patient_id');
            $table->string('patient_name')->after('id');
            $table->string('patient_surname')->after('patient_name');
            $table->string('patient_email')->nullable()->after('patient_surname');
        });

        Schema::dropIfExists('patients');
    }

    public function down(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('surname');
            $table->string('email')->nullable();
            $table->integer('visit_count')->default(0);
            $table->timestamps();
        });

        Schema::table('reports', function (Blueprint $table) {
            $table->dropColumn(['patient_name', 'patient_surname', 'patient_email']);
            $table->foreignId('patient_id')->nullable()->constrained()->nullOnDelete();
        });
    }
};
