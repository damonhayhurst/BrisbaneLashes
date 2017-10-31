<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('master/studios', 'MasterStudioController');
Route::apiResource('staff', 'StudioStaffController');

//Route::post('login/auth','Auth\MasterAuthController@Login');  
//Route::get('login/destroy','Auth\MasterAuthController@Logout');

Route::get('public/studios/{id}', 'PublicStudioController@show');
Route::get('studios/{id}', 'StudioController@show');
Route::put('studios/{id}', 'StudioController@update');

Route::group(['middleware' => 'api'], function () {
    Route::post('auth/master', 'Auth\MasterAuthController@login');
    Route::post('auth/studio', 'Auth\StudioAuthController@login');
    Route::group(['middleware' => 'jwt.auth'], function () {
        Route::get('user', 'Auth\MasterAuthController@getAuthUser');
        Route::get('user', 'Auth\StudioAuthController@getAuthUser');
    });
});