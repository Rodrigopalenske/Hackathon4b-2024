<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistoricoReserva extends Model
{
    protected $fillable = ['reserva_id', 'alteracao', 'tipo'];
}
