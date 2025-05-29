import { createAction, props } from '@ngrx/store';
import { Usuario } from './usuario.model';

export const loadUsuarios = createAction('[Usuarios] Load Usuarios');
export const loadUsuariosSuccess = createAction('[Usuarios] Load Usuarios Success', props<{ usuarios: Usuario[] }>());
export const loadUsuariosFailure = createAction('[Usuarios] Load Usuarios Failure', props<{ error: any }>());

export const addUsuario = createAction(
  '[Usuarios] Add Usuario',
  props<{ usuario: Omit<Usuario, 'id'> }>()
);
export const addUsuarioSuccess = createAction('[Usuarios] Add Usuario Success', props<{ usuario: Usuario }>());
export const addUsuarioFailure = createAction('[Usuarios] Add Usuario Failure', props<{ error: any }>());

export const updateUsuario = createAction('[Usuarios] Update Usuario', props<{ usuario: Usuario }>());
export const updateUsuarioSuccess = createAction('[Usuarios] Update Usuario Success', props<{ usuario: Usuario }>());
export const updateUsuarioFailure = createAction('[Usuarios] Update Usuario Failure', props<{ error: any }>());

export const deleteUsuario = createAction('[Usuarios] Delete Usuario', props<{ id: string }>());
export const deleteUsuarioSuccess = createAction('[Usuarios] Delete Usuario Success', props<{ id: string }>());
export const deleteUsuarioFailure = createAction('[Usuarios] Delete Usuario Failure', props<{ error: any }>());

export const setPaginaActual = createAction(
  '[Usuarios] Set Pagina Actual',
  props<{ pagina: number }>()
);

export const setFiltroRol = createAction(
  '[Usuarios] Set Filtro Rol',
  props<{ rol: string | null }>()
);

export const setFiltroBusqueda = createAction(
  '[Usuarios] Set Filtro Busqueda',
  props<{ busqueda: string }>()
);