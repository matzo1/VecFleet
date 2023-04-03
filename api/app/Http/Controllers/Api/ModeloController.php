<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Modelo;

class ModeloController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $modelo = Modelo::with('marca')->get();
        return $modelo;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $modelo = new Modelo();
        $modelo->descripcion = $request->descripcion;
        $modelo->id_marca = $request->id_marca;
        $modelo->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $modelo = Modelo::find($id);
        return $modelo;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $modelo = Modelo::findOrFail($request->id);
        $modelo->descripcion = $request->descripcion;
        $modelo->id_marca = $request->id_marca;
        $modelo->save();
        return $modelo;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $modelo = Modelo::destroy($id);
        return $modelo;
    }
}
