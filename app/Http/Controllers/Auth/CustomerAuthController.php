<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CustomerAuthController extends Controller {
    
    public function login(Request $request) {
        \Config::set('jwt.user', 'App\Customer');
        \Config::set('auth.providers.users.model', \App\Customer::class);
        $credentials = $request->only('email', 'password');
        $token = null;
        try {
            if (!$token = \JWTAuth::attempt($credentials, ['acs' => 'c', 'sid' => $request->only('studioId')])) {
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
}