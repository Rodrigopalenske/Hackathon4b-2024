<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Notificacao extends Model
{
    protected $fillable = [
        'reserva_id','mensagem', 'tipo', 
    ];
}
