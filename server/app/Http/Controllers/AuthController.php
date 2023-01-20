<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function init(Request $request)
    {
        $user = null;

        if (auth()->guard("sanctum")->check()) {
            $user = auth()->guard("sanctum")->user();
        }

        return [
            "user" => $user

        ];
    }

    public function login(Request $request)
    {
        $credentials = $request->only("email", "password");

        if (!auth()->attempt($credentials)) {
            return response()->json([
                "message" => "Invalid credentials"
            ], 401);
        }

        $user = User::find(auth()->user()->id);
        $token = $user->createToken("token")->plainTextToken;

        return [
            "user" => $user,
            "token" => $token
        ];
    }

    public function register(Request $request)
    {
        $request->validate([
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required|min:6",
            "confirmPassword" => "required|same:password"
        ]);

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => bcrypt($request->password)
        ]);

        $token = $user->createToken("token")->plainTextToken;

        return [
            "user" => $user,
            "token" => $token
        ];
    }
}
