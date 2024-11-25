<?php

namespace App\Http\Controllers;

use App\Models\Ambiente;
use App\Models\DiaHorarioDisponivel;
use App\Models\DiaIndisponivel;
use App\Models\HorarioDisponivel;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class AmbienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // busca todos os ambiente
        $ambientes = Ambiente::get();
        $ambientesCompletos = [];
        // Coleta os dias e horários apartir do id ambientes
        /* foreach ($ambientes as $ambiente) {
            
            //$diaIndisponivelResponse = Http::get(route('diaIndisponivel.index', $ambiente['id']));
            //$diaHorarioDisponivelResponse = Http::get(route('diaHorarioDisponivel.index', $ambiente['id']));
            // cria um ambiente junto com suas informações
            $ambientesCompletos[] = [
                'ambiente_id' => $ambiente['id'],
                'diaIndisponivel' => $diaIndisponivelResponse->json(),
                'diaHorarioDisponivel' => $diaHorarioDisponivelResponse->json(),
            ];
        } */
        // Envia os ambientes
        return response()->json([
            'ambientes' => $ambientes
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
    public function store(Request $request)
    {
        $erros = [];
        // Valida os campos de ambiente
        $validacaoAmbiente = Validator::make($request->all(), [
            'nome' => 'required|max:100|unique:ambients',
            'capacidade' => 'required|numeric',
            'tipo' => 'required|max:100',
            'equipamentos' => 'required',
            'localizacao' => 'required|max:100',
            'status' => 'required|max:100',
        ], [
            'nome.required' => 'O campo nome é obrigatório',
            'nome.max' => 'O campo nome deve ter no máximo 100 caracteres',
            'nome.unique' => 'Já existe um ambiente com esse nome',
            'capacidade.required' => 'O campo capacidade máxima é obrigatório',
            'capacidade.numeric' => 'O campo capacidade máxima deve ser um número',
            'tipo.required' => 'O campo tipo é obrigatório',
            'tipo.max' => 'O campo tipo deve ter no máximo 100 caracteres',
            'equipamentos.required' => 'O campo descrição é obrigatório',
            'localizacao.required' => 'O campo localização é obrigatório',
            'localizacao.max' => 'O campo localização deve ter no máximo 100 caracteres',
            'status.required' => 'O campo status é obrigatório',
            'status.max' => 'O campo status deve ter no máximo 100 caracteres'
        ]);
        if ($validacaoAmbiente->fails()) {
            $erros = $validacaoAmbiente->errors();
            $mensagem = "Credênciais inválidas";
        } else {
            // Define o que será cadastrado no ambiente
            $dadosAmbiente = $request->only('nome', 'capacidade', 'tipo', 'equipamentos', 'localizacao', 'status');
            // Valida os campos de dias e horários disponíveis para o ambiente e cria o dia se necessário
            foreach ($request->dia_hora_disponivel as $dia_hora) {
                $response = Http::post(route('diaHorarioDisponivel.valida'), [
                    'dia_hora_disponivel' => $dia_hora
                ]);
                if ($response->successful()) {
                    $diasHorariosTratados = $response->json()['dias_horarios_tratados'];
                    // Valida os campos de dias indisponíveis para o ambiente
                    Http::withHeaders([
                        'X-CSRF-TOKEN' => csrf_token(),
                    ])->post(route('diaIndisponivel.valida'), [

                        'dias_indisponiveis' => $request->dias_indisponiveis
                    ]);
                    if ($response->successful()) {
                        $diasIndisponiveis = $response->json()['dias_indisponiveis'];
                        // Cria o ambiente
                        $ambienteId = Ambiente::create($dadosAmbiente)->id;
                        // Cria os dias e horários com base no ambiente
                        foreach ($diasHorariosTratados as $diaHorarioTratado) {
                            $diaDisponivelId = $diaHorarioTratado[0];
                            $horarioInicioDisponivel = $diaHorarioTratado[1];
                            $horarioFimDisponivel = $diaHorarioTratado[2];
                            // Cria horário disponível
                            $HorarioDisponivelResponse = Http::post(route('horarioDisponivel.store', $ambienteId), [
                                'horario_inicio' => $horarioInicioDisponivel,
                                'horario_fim' => $horarioFimDisponivel
                            ]);
                            if ($HorarioDisponivelResponse->successful()){
                                // Cria dia e horário disponível
                                Http::post(route('diaHorarioDisponivel.store', $ambienteId), [
                                    'dia_id' => $diaDisponivelId,
                                    'horario_id' => $HorarioDisponivelResponse['id']
                                ]);
                            } else {
                                $erros = $response->json()['erros'];
                                $mensagem = $response->json()['mensagem'];
                            } 
                        }
                        // Cria os dias indisponíveis no ambiente
                        foreach ($diasIndisponiveis as $diaIndisponivel) {
                            Http::post(route('diaIndisponivel.store', $ambienteId), [
                                'data' => $diaIndisponivel->data
                            ]);
                        }
                    }
                } else {
                    $erros = $response->json()['erros'];
                    $mensagem = $response->json()['mensagem'];
                }
            }
        }
        if (empty($erros)) {
            return response()->json([
                'erros' => $erros,
                'mensagem' => $mensagem
            ], 400);
        }
        return response()->json([
            'mensagem' => 'Ambiente criado com sucesso'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Mostra um ambiente específico
        $ambiente = Ambiente::find($id);
        if ($ambiente) {
            return response()->json([
                'ambiente' => $ambiente
            ]);
        }
        return response()->json([
            'ambiente' => []
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
        // busca o ambiente se ele reamlemente existir aaí ele é deletado
        $ambiente = Ambiente::find($id);

        if (!$ambiente) {
            return response()->json(['message' => 'Ambiente não encontrado'], 404);
        }

        $ambiente->delete();
        return response()->json(['message' => 'Ambiente deletado com sucesso'], 200);
    }
}
