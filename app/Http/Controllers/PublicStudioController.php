<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Studio;

/**
* Controller for Studio entity.
*/
class PublicStudioController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $studio = Studio::find($id);
        $studio->makeHidden('abn');
        $studio->makeHidden('email_notify');
        $studio->makeHidden('sms_notify');
        $studio->makeHidden('smtp_server');
        $studio->makeHidden('smtp_user');
        $studio->makeHidden('smtp_pass');
        $studio->makeHidden('smtp_from');
        $studio->makeHidden('created_at');
        $studio->makeHidden('updated_at');
        return $studio;
    }
}