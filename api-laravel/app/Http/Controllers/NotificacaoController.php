<?php

namespace App\Http\Controllers;

use App\Models\Notificacao;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NotificacaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $reservaId)
    {
        // mostra as notificacao
        $notificacao = Notificacao::where('reserva_id', $reservaId)->get();
        return response()->json([
            'reserva_id' => $notificacao
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
        $validacao = Validator::make($request->all(),[
            'mensagem' => 'required|string',
            'status' => 'required|boolean',
            'tipo' => 'required|max:100',
        ], [
            'mensagem.required' => 'Campo mensagem obrigatorio',
            'status.required' => 'Status da mensagem Obrigatorio',
            'tipo.required' => 'Tipo da mensagem Obrigatorio',
            'status.boolean' => 'Status deve ser Boolean',
            'tipo.max' => 'O maximo e 100 caracteres',

        ]);
        if ($validacao->fails()) {
            return response ()->json([
                'erros' => $validacao->errors(),
                'mensagem'=> "Credências inválidas"
            ], 400);
        }
        try {

            $notificacao =Notificacao::create([
                'mensagem' => $request->mensagem,
                'status' => $request->status,
                'tipo' => $request->tipo,
            ]);            
            return response()->json([
                'notificacao' => $notificacao,
                'mensagem' => "Notificação cadastrada com sucesso"
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
        $validacao = Validator::make($request->all(),[
            'status' => 'required|boolean',
        ], [
            'status.required' => 'Status da mensagem Obrigatorio',
            'status.boolean' => 'Status deve ser Boolean',

        ]);
        if ($validacao->fails()) {
            return response ()->json([
                'erros' => $validacao->errors(),
                'mensagem'=> "Credências inválidas"
            ], 400);
        }
        try {
            $notificacao = Notificacao::find($id);
            if (!$notificacao) {
                return response()->json([
                    'erros' => "Notificação não encontrada",
                    'mensagem' => "Notificação não encontrada",
                ]);
            }
            $notificacao->update([
                'status' => $request->status,
            ]);            
            return response()->json([
                'notificacao' => $notificacao,
                'mensagem' => "Notificação Atualizada com sucesso"
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'erros' => $e,
                'mensagem' => "Credênciais inválidas"
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
