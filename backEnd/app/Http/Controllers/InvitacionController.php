<?php

namespace App\Http\Controllers;

use App\Models\Invitado;
use App\Models\Gift;
use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Enums\HttpsCodeEnum;

class InvitacionController extends Controller
{



    /**
     * Validar invitación (cuando entra al link)
     */

    public function GuesVerify($token)
    {
        $token = trim($token);

        if (!$token) {
            return ResponseHelper::response(HttpsCodeEnum::VALIDATION_ERROR);
        }

        $guestWanted = $this->getGuestByToken($token);
        if (!$guestWanted) {
            return ResponseHelper::response(HttpsCodeEnum::NOT_FOUND);
        }

        return ResponseHelper::response(HttpsCodeEnum::SUCCESS, [
            'nombre' => $guestWanted->nombre_invitado,
            'confirmado' => $guestWanted->confirmado,
            'role' => $guestWanted->role
        ]);
    }


    private function getGuestByToken($token): ?Invitado
    {
        return Invitado::firstWhere('token', $token);
    }



    public function confirm(Request $request)
    {
        $request->validate([
            'token' => 'required'
        ]);

        $guest = $this->getGuestByToken($request->token);

        if (!$guest) {
            return ResponseHelper::response(HttpsCodeEnum::NOT_FOUND);
        }

        if ($guest->confirmado) {
            return ResponseHelper::response(
                HttpsCodeEnum::ALREADY_EXISTS,
                ['mensaje' => 'Ya habías confirmado asistencia']
            );
        }

        $guest->confirmado = true;
        $guest->fecha_confirmacion = now();
        $guest->save();

        return ResponseHelper::response(
            HttpsCodeEnum::SUCCESS,
            ['mensaje' => 'Confirmación exitosa']
        );
    }

    /**
     * Listar regalos
     */
    public function listarRegalos(Request $request)
    {
        $invitado = $request->attributes->get('invitado');

        return Gift::all();
    }
    /**
     * Reservar regalo
     */
    public function reservar(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'gift_id' => 'required|exists:gifts,id'
        ]);

        $invitado = $this->validarToken($request->token);

        $gift = Gift::findOrFail($request->gift_id);

        // Si es único y ya fue elegido
        if ($gift->tipo === 'unico' && $gift->veces_elegido >= 1) {
            return response()->json([
                'mensaje' => 'Este regalo ya fue reservado'
            ], 400);
        }

        Reservation::create([
            'invitado_id' => $invitado->id,
            'gift_id' => $gift->id,
            'cantidad' => 1
        ]);

        $gift->increment('veces_elegido');

        return response()->json([
            'mensaje' => 'Reserva realizada con éxito'
        ]);
    }
}
