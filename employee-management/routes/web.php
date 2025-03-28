<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EmployeeController;

// Home Route
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Middleware for Authenticated Users
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard Route
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Create Employee Page
    Route::get('/employees/create', function () {
    return Inertia::render('employees/CreateEmployee');
    })->name('employees.create');

    // Employee Management Routes
    Route::get('/employees/{id}/edit', [EmployeeController::class, 'edit'])->name('employees.edit');
    Route::put('/employees/{id}', [EmployeeController::class, 'update'])->name('employees.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
