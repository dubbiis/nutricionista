<?php

use App\Http\Controllers\CatalogController;
use App\Http\Controllers\ConfigurationController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [ReportController::class, 'dashboard'])->name('dashboard');

    // Perfil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Pacientes
    Route::get('/patients/search', [PatientController::class, 'search'])->name('patients.search');
    Route::resource('patients', PatientController::class);

    // Informes
    Route::get('/reports/create', [ReportController::class, 'create'])->name('reports.create');
    Route::post('/reports', [ReportController::class, 'store'])->name('reports.store');
    Route::get('/reports/{report}', [ReportController::class, 'show'])->name('reports.show');
    Route::get('/reports/{report}/edit', [ReportController::class, 'edit'])->name('reports.edit');
    Route::put('/reports/{report}', [ReportController::class, 'update'])->name('reports.update');
    Route::get('/reports/{report}/pdf', [ReportController::class, 'pdf'])->name('reports.pdf');

    // API JSON (catálogos, alimentos, configuraciones)
    Route::prefix('api')->group(function () {
        Route::get('/catalog/{sectionSlug}', [CatalogController::class, 'items'])->name('api.catalog.items');
        Route::post('/catalog-items', [CatalogController::class, 'store'])->name('api.catalog.store');
        Route::delete('/catalog-items/{catalogItem}', [CatalogController::class, 'destroy'])->name('api.catalog.destroy');

        Route::get('/foods', [FoodController::class, 'index'])->name('api.foods.index');
        Route::get('/food-categories', [FoodController::class, 'categories'])->name('api.foods.categories');
        Route::post('/foods/{food}/toggle-active', [FoodController::class, 'toggleActive'])->name('api.foods.toggle');

        Route::get('/configurations', [ConfigurationController::class, 'index'])->name('api.configurations.index');
        Route::post('/configurations', [ConfigurationController::class, 'store'])->name('api.configurations.store');
        Route::get('/configurations/{configuration}', [ConfigurationController::class, 'show'])->name('api.configurations.show');
        Route::delete('/configurations/{configuration}', [ConfigurationController::class, 'destroy'])->name('api.configurations.destroy');
    });

    // Ajustes
    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::put('/settings', [SettingController::class, 'update'])->name('settings.update');
});

require __DIR__.'/auth.php';
