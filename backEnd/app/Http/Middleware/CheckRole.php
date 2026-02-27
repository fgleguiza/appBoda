<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role)
    {
        $invitado = $request->attributes->get('invitado');

        if (!$invitado || $invitado->role !== $role) {
            abort(403, 'No autorizado');
        }

        return $next($request);
    }
}
