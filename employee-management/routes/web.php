<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/employees/create', function () {
    return Inertia::render('employees/CreateEmployee');
})->name('employees.create');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
