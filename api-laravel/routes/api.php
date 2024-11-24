<?php

use App\Http\Controllers\AmbienteController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DiaDisponivelController;
use App\Http\Controllers\DiaHorarioDisponivelController;
use App\Http\Controllers\HistoricoReservaController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\NotificacaoController;
use App\Models\DiaIndisponivel;
use App\Models\HorarioDisponivel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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


Route::get('/first', function() {
    User::create([
        'name' => 'first',
        'email' => 'first@gmail.com',
        'password' => Hash::make(env('SENHA_USUARIO_PADRAO')),
        'cargo' => 'admin',
    ]);

    return response()->json(['dad' => Hash::make(env('SENHA_USUARIO_PADRAO'))]);
});

Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', 'api'])->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/usuarios', [AuthController::class, 'index']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/usuario', [AuthController::class, 'show']);

    //reservas
    Route::get('/reserva', [ReservaController::class, 'index'])->name('reserva.index');
    Route::get('/usuario/reserva', [ReservaController::class, 'indexUsuario'])->name('reserva.indexUsuario');
    Route::get('/reserva/{id}', [ReservaController::class, 'show'])->name('reserva.show');
    Route::post('/reserva/editar/{id}', [ReservaController::class, 'update'])->name('reserva.update');
    Route::post('/reserva', [ReservaController::class, 'store'])->name('reserva.store');
    Route::get('/reserva/cancelar/{id}', [ReservaController::class, 'cancel'])->name('reserva.cancel');

    Route::get('/historico/reserva', [HistoricoReservaController::class, 'index'])->name('reserva.historico.index');

    Route::post('/historico/reserva', [HistoricoReservaController::class, 'store'])->name('reserva.historico.store');

    // notificação
    Route::get('/notificacao', [NotificacaoController::class,'index'])->name('notificacao.index');
    Route::get('/notificacao/{id}', [NotificacaoController::class,'cancel'])->name('notificacao.cancel');
    Route::post('/notificacao', [NotificacaoController::class,'store'])->name('notificacao.store');
    Route::post('/notificacao/{id}', [NotificacaoController::class,'update'])->name('notificacao.update');

    Route::middleware(\App\Http\Middleware\IsAdmin::class)->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        // usuario
        Route::post('/admin/usuario/update/{id}', [AuthController::class, 'adminUpdate']);
        Route::delete('/admin/usuario/destroy/{id}', [AuthController::class, 'destroy']);

        // ambiente
        Route::get('/admin/ambiente', [AmbienteController::class, 'index'])->name('ambiente.index');
        Route::get('/admin/ambiente/{id}', [AmbienteController::class, 'show'])->name('ambiente.show');
        Route::post('/admin/ambiente', [AmbienteController::class, 'store'])->name('ambiente.store');

        // dia horário
        Route::get('/admin/dia-horario-disponivel/ambiente/{ambienteId}', [DiaHorarioDisponivelController::class, 'index'])->name('diaHorarioDisponivel.index');
        Route::get('/admin/dia-horario-disponivel/{id}', [DiaHorarioDisponivelController::class, 'show'])->name('diaHorarioDisponivel.show');
        Route::post('/admin/dia-horario-disponivel/{ambienteId}', [DiaHorarioDisponivelController::class, 'store'])->name('diaHorarioDisponivel.store');
        Route::post('/admin/dia-horario-disponivel', [DiaHorarioDisponivelController::class, 'valida'])->name('diaHorarioDisponivel.valida');
      
        // dia disponível
        Route::get('/admin/dia-disponivel/{id}', [DiaDisponivelController::class, 'show'])->name('diaDisponivel.show');
        Route::get('/admin/dia-disponivel/ambiente/{id}', [DiaDisponivelController::class, 'show'])->name('diaDisponivel.index');
        Route::post('/admin/dia-disponivel', [DiaDisponivelController::class, 'indexNome'])->name('diaDisponivel.indexNome');
        Route::post('/admin/dia-disponivel/criar', [DiaDisponivelController::class, 'store'])->name('diaDisponivel.store');
    
        // horário disponível
        Route::get('/admin/horario-disponivel/ambiente/{id}', [HorarioDisponivel::class, 'index'])->name('horarioDisponivel.index');
        Route::get('/admin/horario-disponivel/{id}', [HorarioDisponivel::class, 'show'])->name('horarioDisponivel.show');
        Route::post('/admin/horario-disponivel/{ambienteId}', [HorarioDisponivel::class, 'store'])->name('horarioDisponivel.store');
    
        // dia indisponível
        Route::get('/admin/dia-indisponivel/{id}', [DiaIndisponivel::class, 'show'])->name('diaIndisponivel.show');
        Route::post('/admin/dia-indisponivel/{ambienteId}', [DiaIndisponivel::class, 'store'])->name('diaIndisponivel.store');
        Route::post('/admin/dia-indisponivel', [DiaIndisponivel::class, 'valida'])->name('diaIndisponivel.valida');
    });
});