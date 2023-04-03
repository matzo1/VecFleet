<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Marca;

class MarcaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $marca = Marca::all();
        return $marca;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $marca = new Marca();
        $marca->descripcion = $request->descripcion;
        $marca->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $marca = Marca::find($id);
        return $marca;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $marca = Marca::findOrFail($request->id);
        $marca->descripcion = $request->descripcion;
        $marca->save();
        return $marca;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $marca = Marca::destroy($id);
        return $marca;
    }
}
