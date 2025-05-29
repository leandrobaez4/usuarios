export type Rol = 'Admin' | 'User';

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol?: Rol;
}
