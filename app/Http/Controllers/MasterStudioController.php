<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Studio;

/**
* Controller for Studio entity.
*/
class MasterStudioController extends Controller
{
    
    public function __construct() {
        $this->middleware('jwt-auth:master');
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Studio::orderBy('id', 'asc')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
//        $this->validateProperties($request);
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
//        $this->validateProperties($request);
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
        $item->name = $request->input('name');
        $item->abn = $request->input('abn');
        $item->addr_1 = $request->input('addr_1');
        $item->addr_2 = $request->input('addr_2');
        $item->suburb = $request->input('suburb');
        $item->pcode = $request->input('pcode');
        $item->state = $request->input('state');
        $item->phone = $request->input('phone');
        $item->fax = $request->input('fax');
        $item->email = $request->input('email');
        $item->logo = $request->input('logo');
        $item->status = $request->input('status');
        return $item;
    }
    
    private function validateProperties(Request $request){
        switch($this->method())
        {
            case 'POST':
            {
                $rules = [
                    'name' => 'required|unique:studios,name',
                    'abn' => 'required|digits:11',
                    'addr_1' => 'required',
                    'suburb' => 'required',
                    'state' => 'required',
                    'pcode' => 'required|digits:4',
                    'phone' => 'required|numeric',
                    'fax' => 'numeric|nullable',
                    'email' => 'required|email',
                ];
            }
            case 'PUT':
            {
                $rules = [
                    'abn' => 'required|digits:11',
                    'addr_1' => 'required',
                    'suburb' => 'required',
                    'state' => 'required',
                    'pcode' => 'required|digits:4',
                    'phone' => 'required|numeric',
                    'fax' => 'numeric|nullable',
                    'email' => 'required|email',
                ];
            }
            default:break;
        }
        $this->validate($request, $rules);
    }
}