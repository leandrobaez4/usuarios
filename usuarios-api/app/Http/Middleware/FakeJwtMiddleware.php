<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FakeJwtMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->header('Authorization');

        if (!$token || $token !== 'Bearer fake-jwt-token') {
            return response()->json(['message' => 'No autorizado'], 401);
        }

        return $next($request);
    }
}
