<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use Illuminate\Routing\Controller as BaseController;

class UserController extends BaseController
{
   private function getPath() {
        return storage_path('app/usuarios.json');
    }

    private function readAll() {
        $data = file_get_contents($this->getPath());
        return json_decode($data, true) ?? [];
    }

    private function writeAll($usuarios) {
        file_put_contents($this->getPath(), json_encode($usuarios, JSON_PRETTY_PRINT));
    }

    public function index() {
        return response()->json($this->readAll());
    }

    public function store(Request $request) {
        $usuarios = $this->readAll();

        $nuevoEmail = strtolower(trim($request->email));
        $existe = collect($usuarios)->contains(function ($u) use ($nuevoEmail) {
            return strtolower(trim($u['email'])) === $nuevoEmail;
        });

        if ($existe) {
            return response()->json([
                'message' => 'El email ya existe'
            ], 422);
        }

        $nextId = count($usuarios) ? max(array_column($usuarios, 'id')) + 1 : 1;
        $nuevo = $request->all();
        $nuevo['id'] = $nextId;
        $usuarios[] = $nuevo;
        $this->writeAll($usuarios);
        return response()->json($nuevo, 201);
    }

    public function update(Request $request, $id) {
        $usuarios = $this->readAll();

        $nuevoEmail = strtolower(trim($request->email));
        // Buscar si el email ya existe en otro usuario (ignorar el que estamos editando)
        $existe = collect($usuarios)->contains(function ($u) use ($nuevoEmail, $id) {
            return strtolower(trim($u['email'])) === $nuevoEmail && $u['id'] != $id;
        });

        if ($existe) {
            return response()->json([
                'message' => 'El email ya existe en otro usuario'
            ], 422);
        }

        $editado = null;
        foreach ($usuarios as &$u) {
            if ($u['id'] == $id) {
                $u = array_merge($u, $request->all());
                $editado = $u;
            }
        }
        unset($u);

        $this->writeAll($usuarios);

        if ($editado) {
            return response()->json($editado);
        } else {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    }


    public function destroy($id) {
        $usuarios = $this->readAll();
        $usuarios = array_filter($usuarios, fn($u) => $u['id'] != $id);
        $this->writeAll(array_values($usuarios));
        return response()->json(null, 204);
    }
}
