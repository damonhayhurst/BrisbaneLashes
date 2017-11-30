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
Route::apiResource('appointments', 'AppointmentsController');
Route::apiResource('requests/appointments', 'AppointmentRequestsController');
Route::apiResource('customers', 'CustomersController');

Route::post('events', 'EventsController@store');
Route::get('events', 'EventsController@indexByUserBetweenDates');
Route::get('events/{id}', 'EventsController@show');
Route::delete('events/{id}', 'EventsController@destroy');

//Route::post('login/auth','Auth\MasterAuthController@Login');  
//Route::get('login/destroy','Auth\MasterAuthController@Logout');

Route::get('public/studios/{id}', 'PublicStudioController@show');
Route::get('studios/{id}', 'StudioController@show');
Route::put('studios/{id}', 'StudioController@update');

Route::post('auth/master', 'Auth\MasterAuthController@login');
Route::post('auth/studio', 'Auth\StudioAuthController@login');
Route::post('auth/customer', 'Auth\CustomerAuthController@login');