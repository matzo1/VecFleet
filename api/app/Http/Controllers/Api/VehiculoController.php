<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vehiculo;

class VehiculoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Vehiculo::query();
        $query->with('tipoVehiculo','modelo','marca');

        $query->when($request->get('id_marca'), function($query) use($request){
            return $query->whereIn('id_marca',[$request->get('id_marca')]);
           });
        $query->when($request->get('id_modelo'), function($query) use($request){
            return $query->whereIn('id_modelo',[$request->get('id_modelo')]);
            });

        //$vehiculo = Vehiculo::with('tipoVehiculo')->get();
        //$vehiculo = Vehiculo::with('tipoVehiculo')->where('id_tipo_vehiculo', '=', $request->input('id_tipo_vehiculo'))->get();
        return $query->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $vehiculo = new Vehiculo();
        $vehiculo->cantidad_ruedas = $request->cantidad_ruedas;
        $vehiculo->numero_chasis = $request->numero_chasis;
        $vehiculo->id_tipo_vehiculo = $request->id_tipo_vehiculo;
        $vehiculo->id_modelo = $request->id_modelo;
        $vehiculo->id_marca = $request->id_marca;
        $vehiculo->kilometraje = $request->kilometraje;
        $vehiculo->patente = $request->patente;
        $vehiculo->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $vehiculo = Vehiculo::find($id);
        return $vehiculo;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $vehiculo = Vehiculo::findOrFail($request->id);
        $vehiculo->cantidad_ruedas = $request->cantidad_ruedas;
        $vehiculo->numero_chasis = $request->numero_chasis;
        $vehiculo->id_tipo_vehiculo = $request->id_tipo_vehiculo;
        $vehiculo->id_modelo = $request->id_modelo;
        $vehiculo->id_marca = $request->id_marca;
        $vehiculo->kilometraje = $request->kilometraje;
        $vehiculo->patente = $request->patente;
        $vehiculo->save();
        return $vehiculo;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $vehiculo = Vehiculo::destroy($id);
        return $vehiculo;
    }
}
