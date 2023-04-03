<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TipoVehiculo;

class TipoVehiculoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tipoVehiculo = TipoVehiculo::all();
        return $tipoVehiculo;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $tipoVehiculo = new TipoVehiculo();
        $tipoVehiculo->descripcion = $request->descripcion;
        $tipoVehiculo->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tipoVehiculo = TipoVehiculo::find($id);
        return $tipoVehiculo;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tipoVehiculo = TipoVehiculo::findOrFail($request->id);
        $tipoVehiculo->descripcion = $request->descripcion;
        $tipoVehiculo->save();
        return $tipoVehiculo;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tipoVehiculo = TipoVehiculo::destroy($id);
        return $tipoVehiculo;
    }
}
