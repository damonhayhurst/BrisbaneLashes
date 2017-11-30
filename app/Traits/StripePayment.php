<?php

namespace App\Traits;

use Illuminate\Http\Request;
use App\Studio;


trait StripePayment {
    
    public function createStudioSubscription(Studio $studio, $stripeToken) {
        $studio->newSubscription('main', 'monthly')->create($stripeToken, [
            'email' => $studio->email
            ]);
        return response()->json(['data' => $studio->subscribed('main')]);
    }
    
}