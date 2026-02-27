<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Invitado;

class VerificarInvitadoToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->header('X-Invitacion-Token');

        if (!$token) {
            return response()->json([
                'mensaje' => 'Token requerido'
            ], 401);
        }

        $invitado = Invitado::where('token', $token)->first();

        if (!$invitado) {
            return response()->json([
                'mensaje' => 'Token inválido'
            ], 401);
        }

        // Guardamos el invitado en el request
        $request->attributes->set('invitado', $invitado);

        return $next($request);
    }
}
