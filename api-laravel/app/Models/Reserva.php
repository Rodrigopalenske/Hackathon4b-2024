<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    protected $fillable = ['usuario_id', 'ambiente_id', 'data', 'horario_inicio', 'horario_fim', 'status'];
}
