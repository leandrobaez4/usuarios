import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UsuarioActions from './usuario.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
console.log('UsuarioEffects file loaded');
@Injectable()
export class UsuarioEffects {
  

  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {
     
  }

   loadUsuarios$ = createEffect(() => { 
    return this.actions$.pipe(
      ofType(UsuarioActions.loadUsuarios),
      mergeMap(() =>
        this.usuarioService.getUsuarios().pipe(
          map(usuarios => UsuarioActions.loadUsuariosSuccess({ usuarios })),
          catchError(error => of(UsuarioActions.loadUsuariosFailure({ error })))
        )
      )
    );
  });
  
  addUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuarioActions.addUsuario),
      mergeMap(action =>
        this.usuarioService.addUsuario(action.usuario).pipe(
          map(usuario => UsuarioActions.addUsuarioSuccess({ usuario })),
          catchError(error => of(UsuarioActions.addUsuarioFailure({ error })))
        )
      )
    )
  );

  updateUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuarioActions.updateUsuario),
      mergeMap(action =>
        this.usuarioService.updateUsuario(action.usuario).pipe(
          map(usuario => UsuarioActions.updateUsuarioSuccess({ usuario })),
          catchError(error => of(UsuarioActions.updateUsuarioFailure({ error })))
        )
      )
    )
  );

  deleteUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuarioActions.deleteUsuario),
      mergeMap(action =>
        this.usuarioService.deleteUsuario(action.id).pipe(
          map(() => UsuarioActions.deleteUsuarioSuccess({ id: action.id })),
          catchError(error => of(UsuarioActions.deleteUsuarioFailure({ error })))
        )
      )
    )
  );
}
