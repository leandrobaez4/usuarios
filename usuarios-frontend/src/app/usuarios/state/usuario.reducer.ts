import { createReducer, on } from '@ngrx/store';
import * as UsuarioActions from './usuario.actions';
import { Usuario } from './usuario.model';

export interface UsuarioState {
    usuarios: Usuario[];
    loading: boolean;
    error: any;
    paginaActual: number;    
    tamanioPagina: number;  
    filtroRol: string | null;               
    filtroBusqueda: string;  
}

export const initialState: UsuarioState = {
    usuarios: [],
    loading: false,
    error: null,
    paginaActual: 1,
    tamanioPagina: 10,
    filtroRol: null,
    filtroBusqueda: '',
};

export const usuarioReducer = createReducer(
  initialState,
  on(UsuarioActions.loadUsuarios, state => ({ ...state, loading: true })),
  on(UsuarioActions.loadUsuariosSuccess, (state, { usuarios }) => ({ ...state, usuarios, loading: false })),
  on(UsuarioActions.loadUsuariosFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(UsuarioActions.addUsuarioSuccess, (state, { usuario }) => ({
    ...state, usuarios: [...state.usuarios, usuario]
  })),
  on(UsuarioActions.updateUsuarioSuccess, (state, { usuario }) => ({
    ...state, usuarios: state.usuarios.map(u => u.id === usuario.id ? usuario : u)
  })),
  on(UsuarioActions.deleteUsuarioSuccess, (state, { id }) => ({
    ...state, usuarios: state.usuarios.filter(u => u.id !== id)
  })),

  on(UsuarioActions.setPaginaActual, (state, { pagina }) => ({
    ...state,
    paginaActual: pagina
    })),
    on(UsuarioActions.setFiltroRol, (state, { rol }) => ({
  ...state,
  filtroRol: rol,
  paginaActual: 1 
})),
on(UsuarioActions.setFiltroBusqueda, (state, { busqueda }) => ({
  ...state,
  filtroBusqueda: busqueda,
  paginaActual: 1
})),
  
  on(UsuarioActions.addUsuario, UsuarioActions.updateUsuario, UsuarioActions.deleteUsuario,
    state => ({ ...state, loading: true })),
  on(
    UsuarioActions.addUsuarioFailure,
    UsuarioActions.updateUsuarioFailure,
    UsuarioActions.deleteUsuarioFailure,
    (state, { error }) => ({ ...state, loading: false, error })
  )


);
