<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\GiftController;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\InvitadoAdminController;
use App\Http\Controllers\InvitacionController;
use App\Http\Controllers\ReservationController;


Route::get('/invitacion/{token}', [InvitacionController::class, 'validar']);
Route::post('/invitacion/confirmar', [InvitacionController::class, 'confirmar']);

Route::middleware(['invitado.token', 'role:novio'])
    ->prefix('admin')
    ->group(function () {
        Route::post('/invitados', [InvitadoAdminController::class, 'store']);
        Route::get('/regalos', [GiftController::class, 'getGifts']);
        Route::get('/categorias', [CategoryController::class, 'getCategories']);
        Route::post('/addGift', [GiftController::class, 'createGifts']);
    });

Route::post('/reservar/{id}', [ReservationController::class, 'reservar'])
    ->middleware('invitado.token');
