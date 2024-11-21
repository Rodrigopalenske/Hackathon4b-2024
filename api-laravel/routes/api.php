<?php

use App\Http\Controllers\AmbienteController;
use App\Http\Controllers\DiaDisponivelController;
use App\Http\Controllers\DiaHorarioDisponivelController;
use App\Models\DiaIndisponivel;
use App\Models\HorarioDisponivel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/* Route::get('/user', function (Request $request) {
    $user = User::find(1);
    $token = $user->createToken('API Token')->plainTextToken;
    return $request->user();
})->middleware('auth:sanctum'); */

/* Route::middleware('auth:sanctum')->get('/dashboard', function(Request $request) {
    return response()->json(['mensagem' => 'Permitido']);
}); */


// admin(adicionar no midware para apenas o admin ter acesso)


Route::middleware([/* 'auth:sanctum', */ 'api'])->group(function () {
    Route::get('/admin/ambiente', [AmbienteController::class, 'index'])->name('ambiente.index');
    Route::get('/admin/ambiente/{id}', [AmbienteController::class, 'show'])->name('ambiente.show');
    Route::post('/admin/ambiente', [AmbienteController::class, 'store'])->name('ambiente.store');

    Route::get('/admin/dia-horario-disponivel/ambiente/{ambienteId}', [DiaHorarioDisponivelController::class, 'index'])->name('diaHorarioDisponivel.index');
    Route::get('/admin/dia-horario-disponivel/{id}', [DiaHorarioDisponivelController::class, 'show'])->name('diaHorarioDisponivel.show');
    Route::post('/admin/dia-horario-disponivel/{ambienteId}', [DiaHorarioDisponivelController::class, 'store'])->name('diaHorarioDisponivel.store');
    Route::post('/admin/dia-horario-disponivel', [DiaHorarioDisponivelController::class, 'valida'])->name('diaHorarioDisponivel.valida');

    Route::get('/admin/dia-disponivel/{id}', [DiaDisponivelController::class, 'show'])->name('diaDisponivel.show');
    Route::get('/admin/dia-disponivel/ambiente/{id}', [DiaDisponivelController::class, 'show'])->name('diaDisponivel.index');
    Route::post('/admin/dia-disponivel', [DiaDisponivelController::class, 'indexNome'])->name('diaDisponivel.indexNome');
    Route::post('/admin/dia-disponivel/criar', [DiaDisponivelController::class, 'store'])->name('diaDisponivel.store');

    Route::get('/admin/horario-disponivel/ambiente/{id}', [HorarioDisponivel::class, 'index'])->name('horarioDisponivel.index');
    Route::get('/admin/horario-disponivel/{id}', [HorarioDisponivel::class, 'show'])->name('horarioDisponivel.show');
    Route::post('/admin/horario-disponivel/{ambienteId}', [HorarioDisponivel::class, 'store'])->name('horarioDisponivel.store');

    Route::get('/admin/dia-indisponivel/{id}', [DiaIndisponivel::class, 'show'])->name('diaIndisponivel.show');
    Route::post('/admin/dia-indisponivel/{ambienteId}', [DiaIndisponivel::class, 'store'])->name('diaIndisponivel.store');
    Route::post('/admin/dia-indisponivel', [DiaIndisponivel::class, 'valida'])->name('diaIndisponivel.valida');
});