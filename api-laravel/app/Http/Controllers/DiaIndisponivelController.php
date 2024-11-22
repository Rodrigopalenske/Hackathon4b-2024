<?php

namespace App\Http\Controllers;

use App\Models\Ambiente;
use App\Models\DiaIndisponivel;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class DiaIndisponivelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($ambienteId)
    {
        // busca os dias indisponíveis pelo id do ambiente
        $diasIndisponiveis = DiaIndisponivel::where('ambiente_id', $ambienteId)->get();
        return response()->json([
            'dias_indisponiveis' => $diasIndisponiveis
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
    public function store(Request $request, $ambienteId)
    {
        // valida a data do dia indisponibel
        $validacao = Validator::make($request->all(), [
            'data' => 'date',
        ], [
            'data.date' => 'O campo data deve ser uma data',
        ]);
        if ($validacao->fails()) {
            return response()->json([
                'erros' => $validacao->errors(),
                'mensagem' => 'data inválida'
            ], 400);
        }
        // coleta as informções do ambiente específico
        $ambiente = Http::get(route('ambiente.show', $ambienteId));
        if (!empty($ambiente)) {
            try {
                // Cria o dia indisponível que não existe
                $dia_indisponivel = DiaIndisponivel::create([
                    'ambiente_id' => $ambiente->json()['id'],
                    'data' => $request->data
                ]);
                return response()->json([
                    'dia_indisponivel' => $dia_indisponivel,
                    'mensagem' => 'Dia indisponível criado com sucesso'
                ], 201);
            } catch (Exception $e) {
                return response()->json([
                    'erros' => 'Erro inesperado',
                    'mensagem' => 'Erro inesperado'
                ], 400);
            }
        }
        return response()->json([
            'erros' => '',
            'mensagem' => 'Ambiente não encontrado'
        ], 400);
        
    }

    public function valida(Request $request)
    {
        $datasIndisponiveis = [];
        // Valida cada dia indisponivel e vai adicionando em uma lista
        foreach ($request->dias_indisponiveis as $diaIndisponivel) {
            $validacao = Validator::make($diaIndisponivel->only('diaIndisponivel'), [
                'data' => 'date',
            ], 
            [
                'data.date' => 'O campo data deve ser uma data',
            ]);

            if (!$validacao->fails()) {
                $datasIndisponiveis[] = $diaIndisponivel;
            }
        }
        return response()->json([
            'dias_indisponiveis' => $datasIndisponiveis
        ]);
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
        // buscaum dia indisponivel pelo id andes de deletar para ver se existe
        $diaIndisponivel = DiaIndisponivel::find($id);

        if (!$diaIndisponivel) {
            return response()->json(['message' => 'Dia não encontrado'], 404);
        }

        $diaIndisponivel->delete();
        return response()->json(['message' => 'Dia deletado com sucesso'], 200);
    }
}
