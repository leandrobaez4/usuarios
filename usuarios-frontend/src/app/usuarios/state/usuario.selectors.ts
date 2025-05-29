import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsuarioState } from './usuario.reducer';

export const selectUsuarioState = createFeatureSelector<UsuarioState>('usuarios');
export const selectUsuarios = createSelector(selectUsuarioState, s => s.usuarios);
export const selectLoading = createSelector(selectUsuarioState, s => s.loading);
export const selectError = createSelector(selectUsuarioState, s => s.error);


export const selectPaginaActual = createSelector(selectUsuarioState, s => s.paginaActual);
export const selectTamanioPagina = createSelector(selectUsuarioState, s => s.tamanioPagina);

export const selectFiltroRol = createSelector(selectUsuarioState, s => s.filtroRol);
export const selectFiltroBusqueda = createSelector(selectUsuarioState, s => s.filtroBusqueda);

export const selectUsuariosFiltrados = createSelector(
  selectUsuarios,
  selectFiltroRol,
  selectFiltroBusqueda,
  (usuarios, filtroRol, filtroBusqueda) => {
    let resultado = usuarios;
    if (filtroRol && filtroRol !== 'Todos') {
      resultado = resultado.filter(u => u.rol === filtroRol);
    }
    if (filtroBusqueda) {
      const valor = filtroBusqueda.trim().toLowerCase();
      resultado = resultado.filter(
        u =>
          u.nombre.toLowerCase().includes(valor) ||
          u.apellido.toLowerCase().includes(valor)
      );
    }
    return resultado;
  }
);

export const selectUsuariosPaginados = createSelector(
  selectUsuariosFiltrados,
  selectPaginaActual,
  selectTamanioPagina,
  (usuarios, paginaActual, tamanioPagina) => {
    const start = (paginaActual - 1) * tamanioPagina;
    return usuarios.slice(start, start + tamanioPagina);
  }
);

export const selectTotalPaginas = createSelector(
  selectUsuariosFiltrados,
  selectTamanioPagina,
  (usuarios, tamanioPagina) => Math.ceil(usuarios.length / tamanioPagina)
);
