<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;

use App\Traits\JWTAuthUser;

class EventsController extends Controller
{
    use JWTAuthUser;
    
    public function __construct() {
        $this->middleware('jwt-auth:studio');
    }
    
    public function indexByUserBetweenDates(Request $request) {
        return Event::user($request)
            ->whereBetween('start', array($request->start, $request->end))
            ->get();
    }

    public function indexByEmployee(Request $request) {
        return Event::where('employee_assigned_id', $request->employee_id)
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
    
    public function show(Request $request) {
        return Event::find($request->id);
    }
    
    public function destroy(Request $request) {
        $event = Event::find($request->id);
        $event->delete();
        return 'OK';
    }
    
    private function assignProperties(Event $item, Request $request) {
        $user = $this->getAuthUser($request);
        $item->employee_created_id = $user->id;
        $item->employee_assigned_id = $user->id;
        $item->client_id = $request->input('clientId');
        $item->studio_id = $user->studio_id;
        $item->start = $request->input('start');
        $item->end = $request->input('end');
        $item->price = $request->input('price');
        $item->notes = $request->input('notes');
        $item->category = $request->input('title');
        return $item;
    }

}
