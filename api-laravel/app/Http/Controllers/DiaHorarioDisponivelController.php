<?php

namespace App\Http\Controllers;

use App\Models\DiaHorarioDisponivel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class DiaHorarioDisponivelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $ambienteId)
    {
        // busca os dias e os horarios pelo id do ambiente
        $diasDisponiveis = Http::get(route('diaDisponivel.index', $ambienteId));
        $horariosDisponiveis = Http::get(route('horarioDisponivel.index', $ambienteId));

        return response()->json([
            'dias_disponiveis' => $diasDisponiveis,
            'horarios_disponiveis' => $horariosDisponiveis
        ], 200);
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
    public function store(Request $request, string $ambienteId)
    {
        // busca as informações do ambiente pelo id
        $ambienteResponse = Http::get(route('ambiente.show', $ambienteId));
        if (!$ambienteResponse->successful()) {
            return response()->json([
                'erros' => 'Ambiente não existe',
                'mensagem' => 'Ambiente não existe'
            ], 400);
        }
        // busca as informações do dia pelo id
        $diaDisponivelResponse = Http::get(route('diaDisponivel.show', $$request->horario_id));
        if (!$diaDisponivelResponse->successful()) {
            return response()->json([
                'erros' => 'Dia disponível não existe',
                'mensagem' => 'Dia disponível não existe'
            ], 400);
        }
        // busca as informações do horario pelo id
        $horarioDisponivelResponse = Http::get(route('horarioDisponivel.show', $request->horario_id));
        if (!$horarioDisponivelResponse->successful()) {
            return response()->json([
                'erros' => 'Horário disponível não existe',
                'mensagem' => 'Horário disponível não existe'
            ], 400);
        }

        // Cria dia e horário disponível
        DiaHorarioDisponivel::create([
            'ambiente_id' => $ambienteId,
            'dia_id' => $request->dia_id,
            'horario_id' => $request->horario_id
        ]);
    }

    public function valida(Request $request)
    {
        // Busca todos os dias da request e valida um por um
        $horarioDisponivel = [];
        $responseDiaHorarioDisponivel = [];
        foreach ($request->dia_hora_disponivel as $diaHorarioDisponivel) {
            $validacao = Validator::make($diaHorarioDisponivel->all(), [
                'dia_disponivel' => 'required|max:100',
            ], [
                'dia_disponivel.rquired' => 'O campo dia da semana é obrigatório',
                'dia_disponivel.max' => 'O campo dia da semana deve ter no máximo 100 caracteres',
            ]);
            if ($validacao->fails()) {
                return response()->json([
                    'erros' => $validacao->errors(),
                    'mensagem' => "Credênciais inválidas"
                ], 400);
            }
            // Faz a coleta ou cria o dia disponivel
            $response = Http::post(route('diaDisponivel.store'), [
                'dia_disponivel' => $diaHorarioDisponivel->dia_disponivel
            ]);
            if ($response->successful()) {
                $diaDisponivelId = $response['dia_disponivel_id'];
            } else {
                return response()->json([
                    'erros' => $response['erros'],
                    'mensagem' => $response['mensagem']
                ], 400);
            }    
            // Busca todos os horários da request e valida um por um
            foreach ($diaHorarioDisponivel->horas_disponiveis as $horasDisponiveis) {
                $validacao = Validator::make($horasDisponiveis->all(), [
                    'horario_inicio' => 'required|time',
                    'horario_fim' => 'required|time',
                ], 
                [
                    'horario_inicio.required' => 'O campo horário de início é obrigatório',
                    'horario_inicio.time' => 'O campo horário de início deve ser uma hora',
                    'horario_fim.required' => 'O campo horário de finalização é obrigatório',
                    'horario_fim.time' => 'O campo horário de finalização deve ser uma hora',
                ]);
                if ($validacao->fails()) {
                    return response()->json([
                        'erros' => $validacao->errors(),
                        'mensagem' => "Credênciais inválidas"
                    ], 400);
                }
                // Adicionando as horas em uma lista dentro de uma lista lincando com um mesmo dia
                $horarioDisponivel[] = [$horasDisponiveis->horario_inicio, $horasDisponiveis->horario_fim];
            }
            $responseDiaHorarioDisponivel[] = [$diaDisponivelId, $horarioDisponivel];
            
        }
        return response()->json(['dias_horarios_tratados' => $responseDiaHorarioDisponivel]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        // Busca o dia e horario pelo id antes de deletar para confirmar se existe
        $diaHorarioDisponivel = DiaHorarioDisponivel::find($id);

        if (!$diaHorarioDisponivel) {
            return response()->json(['message' => 'Dia não encontrado'], 404);
        }

        $diaHorarioDisponivel->delete();
        return response()->json(['message' => 'Dia deletado com sucesso'], 200);
    }
}
