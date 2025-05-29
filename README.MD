
# Usuarios - Monorepo

Este proyecto incluye dos aplicaciones:

- **usuarios-api**: Backend en Laravel 12
- **usuarios-frontend**: Frontend en Angular 18

---

## Requisitos

- **Node.js**: `>= 20.0.0`
- **npm**: `>= 9.6.4`
- **Composer**: `>= 2.x`
- **PHP**: `>= 8.2`
- **Extensiones PHP** requeridas por Laravel (consultar [Laravel Docs](https://laravel.com/docs/12.x/installation#server-requirements))

---

## Instalación rápida

### 1. Clonar el repositorio

```sh
git clone https://github.com/tu-usuario/usuarios-monorepo.git
cd usuarios-monorepo
```

---

### 2. Backend: usuarios-api (Laravel 12)

```sh
cd usuarios-api
composer install
cp .env.example .env
php artisan key:generate
touch storage/app/usuarios.json
chmod -R 775 storage
php artisan serve
```

- **.env**: Configura la conexión (si usás base de datos real, aunque el mock usa JSON).
- **Fake JWT**: El backend acepta un header `Authorization: Bearer fake-jwt-token` (requerido por el frontend).

---

### 3. Frontend: usuarios-frontend (Angular 18)

```sh
cd ../usuarios-frontend
npm install
npm start
```

- App disponible en `http://localhost:4200`
- El frontend consume la API en `http://localhost:8000/api/usuarios`
- Si usás otra URL/cors, ajusta el `baseUrl` en `src/app/usuarios/services/usuario.service.ts`.

---

## Versiones principales

| Tecnología | Versión  |
| ---------- | -------- |
| Angular    | ^18.2.0  |
| Laravel    | ^12.x    |
| PHP        | >=8.2    |
| Node.js    | >=20.0.0 |
| Composer   | >=2.x    |

---

## Comandos útiles

### **usuarios-api** (Laravel)

- Iniciar servidor local:  `php artisan serve`
- Instalar dependencias:  `composer install`

### **usuarios-frontend** (Angular)

- Iniciar servidor local:  `npm start`
- Instalar dependencias:  `npm install`
- Build producción:  `npm run build`

---

## Notas

- El backend **no usa base de datos**, guarda usuarios en `storage/app/usuarios.json`.
- El frontend y el backend deben correr **simultáneamente**.
- Usa un token JWT fake para autenticación (no implementa login real).

---
