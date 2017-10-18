<?php

namespace App\Http\Controllers;

use App\Studio;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StudioController extends Controller
{
    public function create(Request $request) {
        $json = json_decode( $request->json,true);
        $item = Studio::find($json['Studio_ID']);
        $item->Name = isset($json['studio_name']) ? $json['studio_name'] : null;
        $item->ABN = isset($json['studio_abn']) ? $json['studio_abn'] : null;
        $item->Addr1 = isset($json['studio_addr_1']) ? $json['studio_addr_1'] : null;
        $item->Addr2 = isset($json['studio_addr_2']) ? $json['studio_addr_2'] : null;
        $item->Suburb = isset($json['studio_suburb']) ? $json['studio_suburb'] : null;
        $item->Pcode = isset($json['studio_pcode']) ? $json['studio_pcode'] : null;
        $item->State = isset($json['studio_state']) ? $json['studio_state'] : null;
        $item->Phone = isset($json['studio_phone']) ? $json['studio_phone'] : null;
        $item->Fax = isset($json['studio_fax']) ? $json['studio_fax'] : null;
        $item->Email = isset($json['studio_email']) ? $json['studio_email'] : null;
        $item->Logo = isset($json['studio_logo']) ? $json['studio_logo'] : null;
        $item->Status = isset($json['studio_status']) ? $json['studio_status'] : null;
        $item->save();
        return response()->json($item);
        return 'OK';
    }
}


