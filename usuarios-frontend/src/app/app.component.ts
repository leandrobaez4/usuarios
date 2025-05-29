import { Component } from '@angular/core';
import { UsuarioListComponent } from './usuarios/components/usuario-list/usuario-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    UsuarioListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'usuarios-frontend';
}
