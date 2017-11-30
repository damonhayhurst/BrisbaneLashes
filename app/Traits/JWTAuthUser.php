<?php

namespace App\Traits;

use Illuminate\Http\Request;

trait JWTAuthUser {
    
    public function getAuthUser(Request $request){
        $user = \JWTAuth::toUser($request->token);
        return $user;
    }
    
}