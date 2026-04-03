<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\GiftController;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\InvitadoAdminController;
use App\Http\Controllers\InvitacionController;
use App\Http\Controllers\ReservationController;


Route::get('/verifyGuest/{token}', [InvitacionController::class, 'getVerifyGuest']);
Route::post('/confirm', [InvitacionController::class, 'getConfirm']);
Route::get('/regalos', [GiftController::class, 'index'])->middleware('invitado.token');

// Serve storage files directly
Route::get('/storage/{path}', function ($path) {
    $file = storage_path('app/public/' . $path);
    
    if (!file_exists($file)) {
        return response()->json(['error' => 'File not found'], 404);
    }
    
    return response()->file($file);
})->where('path', '.*')->name('storage');

Route::middleware(['invitado.token', 'role:novio'])
    ->prefix('admin')
    ->group(function () {
        // Invitados CRUD
        Route::get('/invitados', [InvitadoAdminController::class, 'index']);
        Route::post('/invitados', [InvitadoAdminController::class, 'store']);
        Route::get('/invitados/{invitado}', [InvitadoAdminController::class, 'show']);
        Route::put('/invitados/{invitado}', [InvitadoAdminController::class, 'update']);
        Route::delete('/invitados/{invitado}', [InvitadoAdminController::class, 'destroy']);

        // Categorías CRUD
        Route::get('/categorias', [CategoryController::class, 'index']);
        Route::post('/categorias', [CategoryController::class, 'store']);
        Route::get('/categorias/{category}', [CategoryController::class, 'show']);
        Route::put('/categorias/{category}', [CategoryController::class, 'update']);
        Route::delete('/categorias/{category}', [CategoryController::class, 'destroy']);

        // Regalos CRUD
        Route::get('/regalos', [GiftController::class, 'index']);
        Route::post('/regalos', [GiftController::class, 'store']);
        Route::get('/regalos/{gift}', [GiftController::class, 'show']);
        Route::put('/regalos/{gift}', [GiftController::class, 'update']);
        Route::delete('/regalos/{gift}', [GiftController::class, 'destroy']);
    });

Route::post('/reservar/{id}', [ReservationController::class, 'reservar'])
    ->middleware('invitado.token');
