<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;


class AuthController extends Controller
{
    public function index()
    {
        $usuarios = User::get();

        return response()->json([
            'usuarios' => $usuarios
        ], 200);
    }

    public function register(Request $request)
    {
        $validacao = Validator::make($request->all(), [
            'nome' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'cargo' => 'required',
        ], 
        [
            'nome.required' => 'O campo de nome é obrigatório',
            'nome.max' => 'O campo de nome não pode ser maior que 255 caracteres',
            'email.required' => 'O campo de email é obrigatório',
            'email.email' => 'O campo de email deve ser um email',
            'email.unique' => 'O email já foi cadastrado',
            'cargo.required' => 'O campo de cargo é obrigatório',
        ]);

        if ($validacao->fails()) {
            return response()->json([
                'erros' => $validacao->errors(),
                'mensagem' => 'Credenciais inválidas'
            ], 400);
        }
        try {
            $user = User::create([
                'name' => $request->nome,
                'email' => $request->email,
                'password' => Hash::make(env('SENHA_USUARIO_PADRAO')),
                'cargo' => $request->cargo,
            ]);
    
            return response()->json(['mensagem' => 'Usuário registrado com sucesso'], 201);
        } catch (Exception $e) {
            return response()->json([
                'mensagem' => 'Erro inesperado',
                'erro' => $e
            ], 400);
        }
        
    }

    public function adminUpdate(Request $request, string $id)
    {
        
        $validacao = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', Rule::unique('users')->ignore($id)],
            'cargo' => 'required|string',
        ], 
        [
            'nome.required' => 'O campo de nome é obrigatório',
            'nome.max' => 'O campo de nome não pode ser maior que 255 caracteres',
            'email.required' => 'O campo de email é obrigatório',
            'email.email' => 'O campo de email deve ser um email',
            'email.unique' => 'O email já foi cadastrado',
            'cargo.required' => 'O campo de cargo é obrigatório',
        ]);

        if ($validacao->fails()) {
            return response()->json([
                'erros' => $validacao->errors(),
                'mensagem' => 'Credenciais inválidas'
            ], 400);
        }

        $user = User::find($id);
        $user->update([
            'name' => $request->nome,
            'email' => $request->email,
            'cargo' => $request->cargo,
        ]);

        return response()->json(['mensagem' => 'Usuário editado com sucesso'], 201);
    }

    public function login(Request $request)
    {
        $validacao = Validator::make($request->all(), [
            'email' => 'required|email',
            'senha' => 'required',
        ], 
        [
            'email.required' => 'O campo horário de início é obrigatório',
            'email.email' => 'O campo horário de início deve ser uma hora',
            'senha.required' => 'O campo horário de finalização é obrigatório',
        ]);

        if ($validacao->fails()) {
            return response()->json([
                'erros' => $validacao->errors(),
                'mensagem' => "Credenciais inválidas"
            ], 400);
        }

        $user = User::where('email', $request->email)->first();
        if (! $user || ! Hash::check($request->senha, $user->password)) {
            return response()->json([
                'erros' => 'usuário ou senha incorretos',
                'mensagem' => "Usuário ou senha incorretos"
            ], 400);
        }
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'mensagem' => 'Login realizado com sucesso!',
            'token' => $token,
            'usuario' => [
                'id' => $user->id,
                'nome' => $user->name,
                'cargo' => $user->cargo,
                'email' => $user->email,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'mensagem' => 'Logout realizado com sucesso!'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function destroy(string $id)
    {
        
        try {
            $usuario = User::find($id);
        } catch (Exception $e) {
            return response()->json(['mensagem' => 'Usuário não encontrado', 'erros' => $e]);
        }

        if (!$usuario) {
            return response()->json(['mensagem' => 'Usuário não encontrado']);
        }
        try {
            $usuario->delete();
            return response()->json(['mensagem' => 'Usuário deletado com sucesso']);
        } catch (Exception $e) {
            return response()->json(['mensagem' => 'Usuário não encontrado', 'erros' => $e]);
        }
    }
}
