<?php

namespace App\Http\Controllers;

use App\Models\HorarioDisponivel;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HorarioDisponivelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $ambienteId)
    {
        // coleta o horario disponivel apartir de um ambiente
        $horariosDisponiveis = HorarioDisponivel::where('ambiente_id', $ambienteId)->get();
        return response()->json([
            'horarios_disponiveis' => $horariosDisponiveis
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // valida o horário de inicio e o horário de final
        $validacao = Validator::make($request->all(), [
            'horario_inicio' => 'required|time',
            'horario_fim' => 'required|time',
        ], [
            'horario_inicio.required' => 'Adicione uma hora de início para todos os dias da semana',
            'horario_inicio.time' => 'O campo de horario de início deve ser um horário válido',
            'horario_fim.required' => 'Adicione uma hora de fim para todos os dias da semana',
            'horario_fim.time' => 'O campo de horario de fim deve ser um horário válido',
        ]);
        if ($validacao->fails()) {
            return response()->json([
                'erros' => $validacao->errors(),
                'mensagem' => "Credênciais inválidas"
            ], 400);
        }
        try{
            // Cria o horário com a hora de inicio e a hora de fim
            $horarioDisponivel = HorarioDisponivel::create([
                'horario_inicio' => $request->horario_inicio,
                'horario_fim' => $request->horario_fim
            ]);
            // Retorna o horario
            return response()->json([
                'horario_disponivel' => $horarioDisponivel,
                'mensagem' => "Horário criado com sucesso"
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'erros' => $e,
                'mensagem' => "Credênciais inválidas"
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Coleta um horáprio pelo seu id
        $horarioDisponivel = HorarioDisponivel::find($id);

        if ($horarioDisponivel) {
            return response()->json([
                'horario_disponivel' => $horarioDisponivel,
                'mensagem' => "Horário encontrado com sucesso"
            ], 200);
        }
        return response()->json([
            'horario_disponivel' => [],
            'mensagem' => "Horário não encontrado"
        ], 400);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
