<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modelo extends Model
{
    use HasFactory;
    protected $fillable = ['descripcion','id_marca'];
    
    public function marca(){
        return $this->hasOne('App\Models\Marca','id','id_marca');
    }
}
