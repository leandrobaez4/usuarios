<?php

namespace App\Services;

class UserService
{
    private array $users = [];
    private int $nextId = 1;

    public function all(): array
    {
        return array_values($this->users);
    }

    public function find(int $id): ?array
    {
        return $this->users[$id] ?? null;
    }

    public function create(array $data): array
    {
        $user = [
            'id' => $this->nextId++,
            'nombre' => $data['nombre'],
            'apellido' => $data['apellido'],
            'email' => $data['email'],
            'rol' => $data['rol'] ?? null,
        ];
        $this->users[$user['id']] = $user;
        return $user;
    }

    public function update(int $id, array $data): ?array
    {
        if (!isset($this->users[$id])) {
            return null;
        }
        $this->users[$id] = array_merge($this->users[$id], $data);
        return $this->users[$id];
    }

    public function delete(int $id): bool
    {
        if (!isset($this->users[$id])) {
            return false;
        }
        unset($this->users[$id]);
        return true;
    }
}
