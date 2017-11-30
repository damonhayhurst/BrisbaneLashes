<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Appointment;
use App\StudioStaff;
use Auth;

class AppointmentRequestsController extends Controller
{
    public function __construct() {
        $this->middleware('jwt-auth:customer');
    }

    public function show(Request $request) {
        return AppointmentRequest::find($request->id);
    }
    
    public function index() {
        return AppointmentRequest::orderBy('id', 'asc')->get();
    }
    
    public function store(Request $request) {
        $item = new AppointmentRequest;
        $item = $this->assignProperties($item, $request);
        $item->save();
        return response()->json($item);
        return 'OK';
    }
    
    private function assignProperties(Appointment $item, Request $request) {
        $item->employee_assigned_id = StudioStaff::find($request->input('employee_assigned_id'));
        $item->client_id = $request->input('client_id');
        $item->studio_id = $this->getAuthUser($request)->studio_id;
        $item->start_time = $request->input('start_time');
        $item->end_time = $request->input('end_time');
        $item->price = $request->input('price');
        $item->status = 'pending';
        $item->notes = $request->input('notes');
        return $item;
    }
    
     public function getAuthUser(Request $request){
        $user = \JWTAuth::toUser($request->token);
        return $user;
    }
}
