<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        // Verifique se o usuário está autenticado e se é administrador
        if (!$user || $user->cargo !== 'admin') {
            return response()->json([
                'mensagem' => 'Acesso negado. Apenas administradores podem acessar esta rota.',
            ], 403);
        }

        return $next($request);
    }
}
