<?php

namespace App\Http\Controllers;

use App\Models\Invitado;
use App\Models\Gift;
use App\Models\Reservation;
use Illuminate\Http\Request;

class InvitacionController extends Controller
{
    /**
     * Método privado para validar token
     */
    private function validarToken($token)
    {
        $invitado = Invitado::where('token', $token)->first();

        if (!$invitado) {
            abort(401, 'Token inválido');
        }

        return $invitado;
    }

    /**
     * Validar invitación (cuando entra al link)
     */

    public function validar($token)
    {
        $token = trim($token); // 🔥 elimina espacios y saltos invisibles

        $invitado = Invitado::where('token', $token)->first();

        if (!$invitado) {
            return response()->json([
                'valido' => false,
                'mensaje' => 'Invitación inválida'
            ], 404);
        }

        return response()->json([
            'valido' => true,
            'confirmado' => $invitado->confirmado,
            'nombre' => $invitado->nombre_invitado
        ]);
    }



    /**
     * Confirmar asistencia
     */
    public function confirmar(Request $request)
    {
        $request->validate([
            'token' => 'required'
        ]);

        $invitado = $this->validarToken($request->token);

        if ($invitado->confirmado) {
            return response()->json([
                'mensaje' => 'Ya habías confirmado asistencia'
            ]);
        }

        $invitado->confirmado = true;
        $invitado->fecha_confirmacion = now();
        $invitado->save();

        return response()->json([
            'mensaje' => 'Confirmación exitosa'
        ]);
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
