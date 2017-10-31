<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StudioAuthController extends Controller {
    
    public function login(Request $request) {
        \Config::set('jwt.user', 'App\StudioStaff');
        \Config::set('auth.providers.users.model', \App\StudioStaff::class);
        $credentials = $request->only('email', 'password');
        $token = null;
        try {
            if (!$token = \JWTAuth::attempt($credentials,
                                            ['acs' => 's', 'sid' => $request->'studio_id']))
            {
                return response()->json([
                    'error' => $credentials
                ], 401);
            }
        } catch (JWTAuthException $e) {
		    return response()->json([
		        'error' => 'failed_to_create_token',
		    ], 500);
		}
        return response()->json(compact('token'));
    }

    public function getAuthUser(Request $request){
        $user = \JWTAuth::toUser($request->token);        
        return response()->json(['result' => $user]);
    }
}