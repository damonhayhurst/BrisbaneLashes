<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;

class EventsController extends Controller
{
    public function __construct() {
        $this->middleware('jwt-auth:studio');
    }
    
    public function scopeStudio($query, $request) {
        $studioId = $this->getAuthUser($request)->studio_id;
        return $query->where('studio_id', $studioId);
    }
    
    public function scopeUser($query, $request) {
        $userId = $this->getAuthUser($request)->id;
        return $query->where('employee_assigned_id', $userId);
    }

    public function indexByEmployee(Request $request) {
        return Event::where('employee_assigned_id', $request->employee_id)
            ->studio($request)
            ->get();
            
    }
    
    public function index() {
        return Event::orderBy('id', 'asc')->get();
    }
    
    public function store(Request $request) {
        $item = new Event;
        $item = $this->assignProperties($item, $request);
        $item->save();
        return response()->json($item);
        return 'OK';
    }
    
    private function assignProperties(Event $item, Request $request) {
        $user = $this->getAuthUser($request);
        $item->employee_created_id = $user->id;
        $item->employee_assigned_id = $user->id;
        $item->client_id = $request->input('clientId');
        $item->studio_id = $user->studio_id;
        $item->all_day = $request->input('allDay');
        $item->start_time = $request->input('start');
        $item->end_time = $request->input('end');
        $item->price = $request->input('price');
        $item->notes = $request->input('notes');
        $item->category = $request->input('title');
        return $item;
    }
    
     public function getAuthUser(Request $request){
        $user = \JWTAuth::toUser($request->token);
        return $user;
    }
}
