<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
* Controller for Studio subscriptions using Cashier.
*/
class StudioCashierController extends Controller {
    
    public function createSubscription($studioId, $stripeToken) {
        
        $studio = Studio::find($studioId);
        
        $studio->newSubscription('main', 'monthly')->create($stripeToken, [
            'email' = $studio->email
        ]);
        
        if ($studio->subscribed('main') {
            return response()->json(['msg' => 'Successfully subscribed']);
        }
        return response()->json(['msg' => 'Something went wrong with payment'], 402);
    }
    
    public function update($studioId, $stripeToken) {
        $studio = Studio::find($studioId);
        
        $studio->updateCard($stripeToken);
    }
            
}
