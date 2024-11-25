<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiaHorarioDisponivel extends Model
{
    protected $fillable = ['ambiente_id', 'dia_id', 'horario_id'];
}
