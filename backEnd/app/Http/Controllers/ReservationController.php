<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ReservationService;

class ReservationController extends Controller
{
    public function reservar(Request $request, ReservationService $service)
    {
        $invitado = $request->attributes->get('invitado');
        $id_regalo = $request->route('id');

        try {
            $service->reserve($invitado->id, $id_regalo);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }

        return response()->json([
            'message' => 'Regalo reservado correctamente 🎉'
        ], 200);
    }
}
