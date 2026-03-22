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

    public function getVerifyGuest($token)
    {
        $token = trim($token);
        $message = 'Falta el token de invitación';
        if (!$token) {
            return ResponseHelper::response(HttpsCodeEnum::VALIDATION_ERROR, $message);
        }

        $message = 'No se encontró ningún invitado con ese token';
        $guestWanted = $this->getGuestByToken($token);
        if (!$guestWanted) {
            return ResponseHelper::response(HttpsCodeEnum::NOT_FOUND, $message);
        }

        $stateConfirmation = $guestWanted->confirmado ? 'confirmado' : 'pendiente';
        $message = 'Invitado encontrado correctamente';
        return ResponseHelper::response(HttpsCodeEnum::SUCCESS, $message,  [
            'nombre' => $guestWanted->nombre_invitado,
            'confirmado' => $guestWanted->confirmado,
            'role' => $guestWanted->role,
            'estado_confirmacion' => $stateConfirmation,
            'token' => $guestWanted->token
        ]);
    }


    private function getGuestByToken($token): ?Invitado
    {
        return Invitado::firstWhere('token', $token);
    }


    public function getConfirm(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email'
        ]);

        $guest = $this->getGuestByToken($request->token);

        if (!$guest) {
            return ResponseHelper::response(HttpsCodeEnum::NOT_FOUND);
        }

        $message = 'Este invitado ya ha confirmado su asistencia';
        if ($guest->confirmado) {
            return ResponseHelper::response(HttpsCodeEnum::SUCCESS, $message);
        }

        $guest->email_invitado = $request->email;
        $guest->confirmado = true;
        $guest->fecha_confirmacion = now();
        $guest->save();

        $message = 'Confirmación exitosa';
        return ResponseHelper::response(HttpsCodeEnum::SUCCESS, $message);
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
