<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invitado;
use Illuminate\Http\Request;

class InvitadoAdminController extends Controller
{
    // Listar todos los invitados
    public function index()
    {
        $invitados = Invitado::all();

        return response()->json($invitados);
    }

    // Crear invitado
    public function store(Request $request)
    {
        $request->validate([
            'nombre_invitado' => 'required|string|max:255',
            'email_invitado' => 'nullable|email',
            'role' => 'required|in:novio,invitado'
        ]);

        $invitado = Invitado::create([
            'nombre_invitado' => $request->nombre_invitado,
            'email_invitado' => $request->email_invitado,
            'role' => $request->role
        ]);

        return response()->json([
            'mensaje' => 'Invitado creado correctamente',
            'invitado' => $invitado,
            'token' => $invitado->token,
            'link' => url('/invitacion/' . $invitado->token)
        ], 201);
    }

    // Mostrar invitado específico
    public function show(Invitado $invitado)
    {
        return response()->json($invitado);
    }

    // Actualizar invitado
    public function update(Request $request, Invitado $invitado)
    {
        $request->validate([
            'nombre_invitado' => 'required|string|max:255',
            'email_invitado' => 'nullable|email',
            'role' => 'required|in:novio,invitado',
            'confirmado' => 'boolean'
        ]);

        $invitado->update($request->only([
            'nombre_invitado',
            'email_invitado',
            'role',
            'confirmado'
        ]));

        return response()->json([
            'mensaje' => 'Invitado actualizado correctamente',
            'invitado' => $invitado
        ]);
    }

    // Eliminar invitado
    public function destroy(Invitado $invitado)
    {
        $invitado->delete();

        return response()->json([
            'mensaje' => 'Invitado eliminado correctamente'
        ]);
    }
}
