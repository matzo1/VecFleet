<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehiculos', function (Blueprint $table) {
            $table->id();
            $table->integer('cantidad_ruedas');
            $table->string('numero_chasis',30);
            $table->string('patente',10);
            $table->integer('kilometraje');
            $table->unsignedBigInteger('id_tipo_vehiculo');
            $table->foreign('id_tipo_vehiculo')->references('id')->on('tipo_vehiculos');
            $table->unsignedBigInteger('id_modelo');
            $table->foreign('id_modelo')->references('id')->on('modelos');
            $table->unsignedBigInteger('id_marca');
            $table->foreign('id_marca')->references('id')->on('marcas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehiculos');
    }
};
