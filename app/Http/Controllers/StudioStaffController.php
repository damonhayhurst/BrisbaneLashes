<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StudioStaffController extends Controller
{
    public function show($id) {
        return StudioStaff::find($id);
    }
    
    public function index() {
        return StudioStaff::orderBy('id', 'asc')->get();
    }
    
    public function store(Request $request) {
        $item = new StudioStaff;
        $item = $this->assignProperties($item, $request);
        $item->save();
        return response()->json($item);
        return 'OK';
    }
    
    public function update(Request $request, $id) {
//        $this->validateProperties($request);
        $item = StudioStaff::find($id);
        $item = $this->assignProperties($request, $json);
        $item->save();
        return response()->json($item);
    }
    
    public function destroy($request) {
        $staff = StudioStaff::find($request->id);
        $staff->delete();
        return 'OK';
    }
    
    public function assignProperties(StudioStaff $item, Request $request) {
        $item->first_name = $request->input('first_name');
        $item->last_name = $request->input('last_name');
        $item->email = $request->input('email');
        $item->password = $request->Hash::make(input('password'));
        $item->studio_id = $request->studio_id;
        return $item;
    }
    
    
}
