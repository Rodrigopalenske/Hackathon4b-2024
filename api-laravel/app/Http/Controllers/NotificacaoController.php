<?php

namespace App\Http\Controllers;

use App\Models\Notificacao;
use Exception;
use Illuminate\Http\Request;

use App\Models\Reserva;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class NotificacaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        // mostra as notificacao
        // $notificacao = Notificacao::where('reserva_id', $reservaId)->get();
        //return response()->json([
        //  'reserva_id' => $notificacao
        //]);



        // verifica se tem notificações 
        try {
            $user = Auth::user();
            $usuarioId = $user->id;
            $reservas = Reserva::where('usuario_id', $usuarioId)->get();
            $notificacoes = [];

            foreach ($reservas as $reserva) {
                $notificacao = Notificacao::where('reserva_id', $reserva['id'])->where('status', 0)->get();
                if (!$notificacao->isEmpty()) {
                    for ($i = 0; $i < count($notificacao); $i++) {
                        $dataFormatada = Carbon::parse($notificacao[$i]->created_at)->format('d/m/Y');

                        $notificacoes[] = [
                            'id' => $notificacao[$i]->id,
                            'mensagem' => $notificacao[$i]->mensagem,
                            'tipo' => $notificacao[$i]->tipo,
                            'status' => $notificacao[$i]->status,
                            'data' => $dataFormatada
                        ];
                    }
                };
            }
            $lidas = Notificacao::where('status', 1)->get();
            $count = count($lidas) < 5 ? count($lidas) : 5;

            for ($i = 0; $i < $count; $i++) {
                $dataFormatada = Carbon::parse($lidas[$i]->created_at)->format('d/m/Y');

                $notificacoes[] = [
                    'id' => $lidas[$i]->id,
                    'mensagem' => $lidas[$i]->mensagem,
                    'tipo' => $lidas[$i]->tipo,
                    'status' => $lidas[$i]->status,
                    'data' => $dataFormatada
                ];
            }

            return response()->json([
                'notificacoes' => $notificacoes,
                'mensagem' => "Suas notificações"
            ], 200);
        } catch (Exception $e) {

            return response()->json([
                'notificacoes' => [],
                'erros' => $e,

                'mensagem' => "Não existem notificações"
            ], 400);
        }
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
        $reservaId = $request->reserva_id;

        $reserva = Reserva::find($reservaId);

        if (!$reserva) {
            return response()->json([
                'mensagem' => 'Reserva não encontrada',

            ], 400);
        }

        $validacao = Validator::make($request->all(), [
            'mensagem' => 'required|string',
            'tipo' => 'required|max:100',
        ], [
            'mensagem.required' => 'Campo mensagem obrigatorio',
            'tipo.required' => 'Tipo da mensagem Obrigatorio',
            'tipo.max' => 'O maximo e 100 caracteres',

        ]);
        if ($validacao->fails()) {

            return response()->json([
                'erros' => $validacao->errors(),
                'mensagem' => "Credências inválidas"
            ], 400);
        }
        try {

            $notificacao = Notificacao::create([
                'reserva_id' => $reservaId,
                'mensagem' => $request->mensagem,
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

        $validacao = Validator::make($request->all(), [
            'status' => 'required|boolean',
        ], [
            'status.required' => 'Status da mensagem Obrigatorio',
            'status.boolean' => 'Status deve ser Boolean',

        ]);
        if ($validacao->fails()) {
            return response()->json([
                'erros' => $validacao->errors(),
                'mensagem' => "Credências inválidas"
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

    public function cancel(string $id)
    {
        $notificacao = Notificacao::find($id);

        if (!$notificacao) {
            return response()->json([
                'erros' => 'Erro ao cancelar a reserva',
                'mensagem' => 'Notificação não existe!'
            ], 400);
        }
        if (!$notificacao->status) {
            return response()->json([
                'erros' => 'Erro ao cancelar a reserva',
                'mensagem' => 'Notificação já lida'
            ], 400);
        }

        $notificacao->update([
            'status' => 0
        ]);
        return response()->json([
            'mensagem' => 'Notificação lida com sucesso '
        ], 200);
    }
}
