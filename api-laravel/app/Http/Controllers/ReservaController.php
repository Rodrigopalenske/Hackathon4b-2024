<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class ReservaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservas = Reserva::get();
        return response()->json(['reservas' => $reservas], 200);
    }

    public function indexUsuario(string $usuarioId)
    {
        $reservas = Reserva::when('usuario_id', $usuarioId)->get();
        return response()->json(['reservas' => $reservas], 200);
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
        $user = Auth::user();

        $usuarioId = $user->id;
        
        $ambienteId = $request->ambiente_id['id'];

        //precisa de ambiente para funcionar
        /* if (!$usuarioId || !$ambienteId) {
            return response()->json([
                'erros' => 'usuário ou ambiente inválido',
                'mensagem' => 'Erro inesperado'
            ], 400);
        } */
        /* return response()->json([
            'erros' => [$usuarioId, $ambienteId, $data, $request->horario_inicio, $request->horario_fim, $request->status],
            'mensagem' => 'Erro inesperado'
        ], 400); */

        $validate = Validator::make($request->all(), [
            'data' => 'required|date',
            'horario_inicio' => 'required|time',
            'horario_fim' => 'required|time',
            'status' => 'required|boolean'
        ], [
            "data.required" => 'O campo data é obrigatório',
            "data.date" => 'O campo data deve ser uma data',
            "horario_inicio.required" => 'O campo horário de início deve ser preenchido',
            "horario_inicio.time" => 'O campo horário de início deve ser uma hora válida',
            "horario_fim.required" => 'O campo horário de finalização deve ser preenchido',
            "horario_fim.time" => 'O campo horário de finalização deve ser uma hora válida',
            "status.required" => 'O campo de status da reserva deve ser preenchido',
            "status.boolean" => 'O campo status da reserva deve ser verdadeiro ou falso',
        ]);
        
        if ($validate->failed()) {
            return response()->json([
                'erros' => $validate->errors(),
                'mensagem' => 'Credênciais inválidas'
            ], 400);
        }
        try {
            $data = Carbon::parse($request->data)->format('Y-m-d');
            $horarioInicio = Carbon::createFromFormat('H:i', $request->horario_inicio)->format('H:i');
            $horarioFim = Carbon::createFromFormat('H:i', $request->horario_fim)->format('H:i');

            Reserva::create([
                'usuario_id' => $usuarioId,
                'ambiente_id' => $ambienteId,
                'data' => $data,
                'horario_inicio' => $horarioInicio,
                'horario_fim' => $horarioFim,
                'status' => $request->status,
            ]);
            return response()->json([
                'mensagem' => 'Registro realizado com sucesso'
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'erros' => 'Erro ao cadastrar a reserva',
                'mensagem' => 'Erro inesperado'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $reserva = Reserva::find($id);
        $data = $reserva->data;
        $dataAtual = Carbon::today();
        
        $editavel = false;
        if ($data > $dataAtual) {
            $editavel = !$editavel;
        }
        if (!$reserva) {
            return response()->json([
                'erros' => 'Erro ao cadastrar a reserva',
                'mensagem' => 'Erro inesperado'
            ], 400);
        }
        return response()->json([
            'reserva' => $reserva,
            'mensagem' => 'Reserva encontrada',
            'editavel' => $editavel
        ], 200);
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
        if (!$request->editavel) {
            return response()->json(['mensagem' => 'Você deve cancelar ou editar uma reserva com um dia de antecedência']);
        }
        $validate = Validator::make($request->all(), [
            'data' => 'required|date',
            'horario_inicio' => 'required|time',
            'horario_fim' => 'required|time',
            'status' => 'required|boolean'
        ], [
            "data.required" => 'O campo data deve ser obrigatório',
            "data.date" => 'O campo data deve ser uma data',
            "horario_inicio.required" => 'O campo horário de início deve ser preenchido',
            "horario_inicio.time" => 'O campo horário de início deve ser uma hora válida',
            "horario_fim.required" => 'O campo horário de finalização deve ser preenchido',
            "horario_fim.time" => 'O campo horário de finalização deve ser uma hora válida',
            "status.required" => 'O campo de status da reserva deve ser preenchido',
            "status.boolean" => 'O campo status da reserva deve ser verdadeiro ou falso',
        ]);
        if ($validate->fails()) {
            return response()->json([
                'erros' => $validate->errors(),
                'mensagem' => 'Credênciais inválidas'
            ], 400);
        }
        try {
            $reserva = Reserva::find($id);
            if ($reserva) {
                $reserva->update([
                    'data' => $request->data,
                    'horario_inicio' => $request->horario_inicio,
                    'horario_fim' => $request->horario_fim
                ]);
                return response()->json([
                    'mensagem' => 'Registro realizado com sucesso'
                ], 201);
            }
            return response()->json([
                'erros' => 'Erro ao cadastrar a reserva',
                'mensagem' => 'Reserva não encontrada'
            ], 400);
        } catch (Exception $e) {
            return response()->json([
                'erros' => 'Erro ao cadastrar a reserva',
                'mensagem' => 'Erro inesperado'
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
