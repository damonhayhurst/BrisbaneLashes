<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;

class CustomersController extends Controller
{
    public function __construct() {
        $this->middleware('jwt-auth:studio');
    }

    public function show(Request $request) {
        return Customer::find($request->id);
    }
    
    public function index() {
        return Customer::orderBy('id', 'asc')->get();
    }
    
    public function store(Request $request) {
        $item = new Customer;
        $item = $this->assignProperties($item, $request);
        $item->save();
        return response()->json($item);
        return 'OK';
    }
    
    private function assignProperties(Customer $item, Request $request) {
        return $item;
    }
    
     public function getAuthUser(Request $request){
        $user = \JWTAuth::toUser($request->token);
        return $user;
    }
}
