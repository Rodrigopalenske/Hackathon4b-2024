<?php

namespace App\Http\Controllers;

use App\Models\DiaDisponivel;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class DiaDisponivelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $ambienteId)
    {
        // Busca os dias disponíveis pelo id do ambiente
        $diasDisponiveis = DiaDisponivel::where('ambiente_id', $ambienteId)->get();
        return response()->json([
            'dias_disponiveis' => $diasDisponiveis
        ]);
    }

    public function indexNome(Request $request)
    {
        // Busca o dia da semana pelo nome
        $diaDisponivel = DiaDisponivel::where('nome', $request->dia)->get();
        return response()->json([
            'dia_disponivel_id' => $diaDisponivel['id']
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
        // valida o dia enviado
        $validacao = Validator::make($request->all(), [
            'dia_disponivel' => 'required|max:100',
        ], [
            'dia_disponivel.required' => 'O campo dia da semana é obrigatório',
            'dia_disponivel.max' => 'O campo dia da semana deve ter no máximo 100 caracteres',
        ]);
        // Se falhar envia erro
        if ($validacao->fails()) {
            return response()->json([
                'erros' => $validacao->errors(),
                'mensagem' => "Credênciais inválidas"
            ], 400);
            
        } else {
            // se funcionar busca o dia pelo nome 
            $response = Http::post(route('diaDisponivel.index', [
                'nome' => $request->dia_disponivel
            ]));
            // Se existir usa ele para pegar o id
            if ($response->successful()) {
                return response()->json(['dia_disponivel_id' => $response->json()['dia_disponivel_id']]);
            } else {
                // Se não existir cria o dia da semana e busca ele
                try {
                    $diaDisponivel = DiaDisponivel::create($request->dia);
                    return response()->json([
                        'dia_disponivel_id' => $diaDisponivel->id
                    ], 201);
                } catch (Exception $e) {
                    return response()->json([
                        'erros' => $e,
                        'mensagem' => "Erro inesperado"
                    ], 400);
                }
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Busca um dia da semana pelo id
        $diaDisponivel = DiaDisponivel::find($id);

        if ($diaDisponivel) {
            return response()->json([
                'dia_disponivel' => $diaDisponivel,
                'mensagem' => "Horário encontrado com sucesso"
            ], 200);
        }
        return response()->json([
            'dia_disponivel' => [],
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
