<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Studio;

/**
* Controller for Studio entity.
*/
class StudioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Studio::orderBy('studio_ID', 'asc')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        $this->validate($request, [
            'name' => 'required|unique:studio_details,studio_name',
            'abn' => 'required|digits:11',
            'addr_1' => 'required',
            'suburb' => 'required',
            'state' => 'required',
            'pcode' => 'required|digits:4',
            'phone' => 'required|numeric',
            'fax' => 'numeric',
            'email' => 'required|email',
            ]);
        $item = new Studio;
        $item = $this->assignProperties($item, $request);
        $item->save();
        return response()->json($item);
        return 'OK';
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Studio::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $item = Studio::find($id);
        $item = $this->assignProperties($re, $json);
        $item->save();
        return response()->json($item);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $studio = Studio::find($request->id);
        $studio->delete();
        return 'OK';
    }
    
    private function assignProperties(Studio $item, Request $request) {
        $item->studio_name = $request->input('name');
        $item->studio_abn = $request->input('abn');
        $item->studio_addr_1 = $request->input('addr_1');
        $item->studio_addr_2 = $request->input('addr_2');
        $item->studio_suburb = $request->input('suburb');
        $item->studio_pcode = $request->input('pcode');
        $item->studio_state = $request->input('state');
        $item->studio_phone = $request->input('phone');
        $item->studio_fax = $request->input('fax');
        $item->studio_email = $request->input('email');
        $item->studio_logo = $request->input('logo');
        $item->studio_status = $request->input('status');
        return $item;
    }
}