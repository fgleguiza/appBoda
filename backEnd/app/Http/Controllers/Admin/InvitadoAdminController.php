<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invitado;
use Illuminate\Http\Request;

class InvitadoAdminController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nombre_invitado' => 'required|string|max:255'
        ]);

        $invitado = Invitado::create([
            'nombre_invitado' => $request->nombre_invitado
        ]);

        return response()->json([
            'mensaje' => 'Invitado creado correctamente',
            'token' => $invitado->token,
            'link' => url('/invitacion/' . $invitado->token)
        ]);
    }
}
