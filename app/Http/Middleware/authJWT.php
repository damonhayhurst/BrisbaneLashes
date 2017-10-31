<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Exception;

class authJWT
{
    
    const MASTER = 'm';
    const STUDIO_STAFF = 's';
    
    private function determineAccess($access) {
        if ($access == 'master') {
            return self::MASTER;
        } else {
            return self::STUDIO_STAFF;
        }
    }
    
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $access)
    {
        try {
            $user = JWTAuth::toUser(JWTAuth::getToken());
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                return response()->json(['error' => 'Token is invalid'], 401);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                return response()->json(['error' => 'Token is expired'], 401);
            }else{
                return response()->json(['error' => 'Something is wrong'], 500);
            }
        }
        $payload = JWTAuth::parseToken()->getPayload();
        if ($payload['acs'] != self::determineAccess($access)) {
            return response()->json(['error' => 'Unable to access'], 403);
        }
        if ($payload['acs'] == self::STUDIO_STAFF && $payload['sid'] != $user->id) {
            return response()->json(['error' => 'Unable to access'.$user->id], 403);
        }
        
        return $next($request);
    }
}