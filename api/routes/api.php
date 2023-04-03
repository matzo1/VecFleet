<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VehiculoController;
use App\Http\Controllers\Api\TipoVehiculoController;
use App\Http\Controllers\Api\ModeloController;
use App\Http\Controllers\Api\MarcaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::controller(VehiculoController::class)->group(function (){
    Route::get('/vehiculo', 'index');
    Route::post('/vehiculo', 'store');
    Route::get('/vehiculo/{id}', 'show');
    Route::put('/vehiculo/{id}', 'update');
    Route::delete('/vehiculo/{id}', 'destroy');

});
Route::controller(TipoVehiculoController::class)->group(function (){
    Route::get('/tipoVehiculo', 'index');

});
Route::controller(ModeloController::class)->group(function (){
    Route::get('/modelo', 'index');

});
Route::controller(MarcaController::class)->group(function (){
    Route::get('/marca', 'index');

});