// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects'; // <--- This is the key
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { usuarioReducer } from './app/usuarios/state/usuario.reducer';
// import { UsuarioEffects } from './app/usuarios/state/usuario.effects';
// import { importProvidersFrom } from '@angular/core'; // Still remove this if not using
// import { ReactiveFormsModule } from '@angular/forms'; // Still remove this if not using
import { provideHttpClient } from '@angular/common/http';

console.log('BOOTSTRAP INIT');

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideStore({ usuarios: usuarioReducer }),
    // THIS IS THE CORRECT WAY: Pass the result of provideEffects directly as an item
    // provideEffects(UsuarioEffects), // <--- NO SPREAD OPERATOR HERE!
    provideStoreDevtools({ maxAge: 25 }),
    // Re-add importProvidersFrom(ReactiveFormsModule) ONLY IF you cannot import it directly into the component.
    // However, it's generally better to import it in the component itself.
    // If you do need it for root-level stuff (less common for forms):
    // importProvidersFrom(ReactiveFormsModule),
    provideHttpClient(),
  ]
}).catch(err => console.error(err));