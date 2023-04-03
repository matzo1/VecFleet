<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehiculo extends Model
{
    use HasFactory;

    protected $fillable = ['cantidad_ruedas','numero_chasis','id_tipo_vehiculo','id_modelo','kilometraje','patente','id_marca'];

    public function tipoVehiculo(){
        return $this->hasOne('App\Models\TipoVehiculo','id','id_tipo_vehiculo');
    }
    public function modelo(){
        return $this->hasOne('App\Models\Modelo','id','id_modelo');
    }
    public function marca(){
        return $this->hasOne('App\Models\Marca','id','id_marca');
    }
}
