<?php

namespace App\Http\Controllers;

use App\Models\HistoricoReserva;
use App\Models\Reserva;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use function PHPUnit\Framework\isEmpty;


class HistoricoReservaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            
            $user = Auth::user();
            $usuarioId = $user->id;
            $reservas = Reserva::where('usuario_id', $usuarioId)->get();
            $historicos = [];
            foreach ($reservas as $reserva) {
                $historicoReservas = HistoricoReserva::where('reserva_id', $reserva->id)->get();

                foreach ($historicoReservas as &$historicoReserva) {
                    $historicoReserva->data_criacao = Carbon::parse($historicoReserva->created_at)->subHours(3)->format('d/m/Y H:i:s');
                }

                $historicos[] = [
                    'reserva' => $reserva,
                    'historicos' => $historicoReservas,

                ];
            }
            return response()->json([
                'historico_reserva' => $historicos,
                'mensagem' => 'Histórico de reservas encontrado',
            ], 200);
        } catch (Exception $e) {
            return response()->json(['erros' => $e], 400);
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
                'mensagem' => 'Reserva não encontrada'
            ], 400);
        }
        $validate = Validator::make($request->all(), [
            'alteracao' => 'required',
            'tipo' => 'required',
        ], [
            "alteracao.required" => 'O campo de alteração é obrigatório',
            "tipo.required" => 'O campo tipo da reserva é obrigatório',
        ]);
        
        if ($validate->failed()) {
            return response()->json([
                'erros' => $validate->errors(),
                'mensagem' => 'Credênciais inválidas'
            ], 400);
        }

        try {
            if (!$request->alteracao) {
                return response()->json([
                    'mensagem' => 'Nenhuma alteração'
                ], 200);
            }

            foreach ($request->alteracao as $alteracao) {
                HistoricoReserva::create([
                    'reserva_id' => $request->reserva_id,
                    'alteracao' => $alteracao,
                    'tipo' => $request->tipo,
                ]);
            }
            return response()->json([
                'mensagem' => 'Ação cadastrada com sucesso'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'erros' => $e->getMessage(),
                'mensagem' => 'Erro inesperado'
            ], 500);
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
