<?php

use App\Http\Controllers\AmbienteController;
use App\Http\Controllers\AuthController;
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

Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});


// admin(adicionar no midware para apenas o admin ter acesso)



Route::post('/login', [AuthController::class, 'login'])->middleware('api');

Route::middleware(['auth:sanctum', 'api'])->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/admin/usuario/update/{id}', [AuthController::class, 'adminUpdate'])->middleware('admin');
    Route::delete('/admin/usuario/destroy/{id}', [AuthController::class, 'destroy'])->middleware('admin');

    Route::get('/notificaco', [AuthController::class, 'index'])->name('notificacao.index');

    Route::get('/usuarios', [AuthController::class, 'index']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::get('/admin/ambiente', [AmbienteController::class, 'index'])->name('ambiente.index')->middleware('admin');
    Route::get('/admin/ambiente/{id}', [AmbienteController::class, 'show'])->name('ambiente.show')->middleware('admin');
    Route::post('/admin/ambiente', [AmbienteController::class, 'store'])->name('ambiente.store')->middleware('admin');

    Route::get('/admin/dia-horario-disponivel/ambiente/{ambienteId}', [DiaHorarioDisponivelController::class, 'index'])->name('diaHorarioDisponivel.index')->middleware('admin');
    Route::get('/admin/dia-horario-disponivel/{id}', [DiaHorarioDisponivelController::class, 'show'])->name('diaHorarioDisponivel.show')->middleware('admin');
    Route::post('/admin/dia-horario-disponivel/{ambienteId}', [DiaHorarioDisponivelController::class, 'store'])->name('diaHorarioDisponivel.store')->middleware('admin');
    Route::post('/admin/dia-horario-disponivel', [DiaHorarioDisponivelController::class, 'valida'])->name('diaHorarioDisponivel.valida')->middleware('admin');

    Route::get('/admin/dia-disponivel/{id}', [DiaDisponivelController::class, 'show'])->name('diaDisponivel.show')->middleware('admin');
    Route::get('/admin/dia-disponivel/ambiente/{id}', [DiaDisponivelController::class, 'show'])->name('diaDisponivel.index')->middleware('admin');
    Route::post('/admin/dia-disponivel', [DiaDisponivelController::class, 'indexNome'])->name('diaDisponivel.indexNome')->middleware('admin');
    Route::post('/admin/dia-disponivel/criar', [DiaDisponivelController::class, 'store'])->name('diaDisponivel.store')->middleware('admin');

    Route::get('/admin/horario-disponivel/ambiente/{id}', [HorarioDisponivel::class, 'index'])->name('horarioDisponivel.index')->middleware('admin');
    Route::get('/admin/horario-disponivel/{id}', [HorarioDisponivel::class, 'show'])->name('horarioDisponivel.show')->middleware('admin');
    Route::post('/admin/horario-disponivel/{ambienteId}', [HorarioDisponivel::class, 'store'])->name('horarioDisponivel.store')->middleware('admin');

    Route::get('/admin/dia-indisponivel/{id}', [DiaIndisponivel::class, 'show'])->name('diaIndisponivel.show')->middleware('admin');
    Route::post('/admin/dia-indisponivel/{ambienteId}', [DiaIndisponivel::class, 'store'])->name('diaIndisponivel.store')->middleware('admin');
    Route::post('/admin/dia-indisponivel', [DiaIndisponivel::class, 'valida'])->name('diaIndisponivel.valida')->middleware('admin');
});