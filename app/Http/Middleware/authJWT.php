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
        $payload = JWTAuth::parseToken()->getPayload();
        if ($payload['acs'] != self::determineAccess($access)) {
            return response()->json(['error' => 'Unable to access'], 403);
        }
        if ($payload['acs'] == 'm') {
            \Config::set('jwt.user', 'App\MasterStaff');
            \Config::set('auth.providers.users.model', \App\MasterStaff::class);
        } else if ($payload['acs'] == 's') {
            \Config::set('jwt.user', 'App\StudioStaff');
            \Config::set('auth.providers.users.model', \App\StudioStaff::class);
        } else {
            \Config::set('jwt.user', 'App\Customer');
            \Config::set('auth.providers.users.model', \App\Customer::class);
        }
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
//        if ($payload['acs'] == self::STUDIO_STAFF && implode($payload['sid']) != $user->studio_id) {
//            return response()->json(['error' => 'Unable to access'], 403);
//        }
        
        return $next($request);
    }
}