import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { LoadingComponent } from '../loading/loading.component';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../state/usuario.model';

@Component({
  standalone: true,
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    UsuarioFormComponent,
    LoadingComponent,
  ]
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading = false;
  error: string | null = null;
  usuarioEdit: Usuario | null = null;

  filtroRol: string = '';
  filtroBusqueda: string = '';
  paginaActual = 1;
  totalPaginas = 1;
  tamanioPagina = 10;
  agregando = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.loading = true;
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.totalPaginas = Math.ceil(this.usuariosFiltradosSinPaginar.length / this.tamanioPagina) || 1;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los usuarios';
        this.loading = false;
      }
    });
  }

  editarUsuario(usuario: Usuario) {
    this.usuarioEdit = { ...usuario }; // copia para edición
  }

  limpiarForm() {
    this.usuarioEdit = null;
  }

  onAgregandoUsuario(flag: boolean) {
  this.agregando = flag;
}

 borrar(id: string) {
  if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    this.loading = true;
    this.usuarioService.deleteUsuario(id).subscribe({
      next: () => this.cargarUsuarios(),
      error: () => {
        this.error = 'Error al borrar usuario';
        this.loading = false;
      }
    });
  }
}

 onUsuarioActualizado() {
    this.cargarUsuarios();
    this.limpiarForm();
  }

  onFiltroBusquedaInput(event: Event) {
  const value = (event.target instanceof HTMLInputElement) ? event.target.value : '';
  this.setFiltroBusqueda(value);
}

  setFiltroRol(rol: string) {
    this.filtroRol = rol;
    this.paginaActual = 1;
    this.totalPaginas = Math.ceil(this.usuariosFiltradosSinPaginar.length / this.tamanioPagina) || 1;
  }

  setFiltroBusqueda(busqueda: string) {
    this.filtroBusqueda = busqueda;
    this.paginaActual = 1;
    this.totalPaginas = Math.ceil(this.usuariosFiltradosSinPaginar.length / this.tamanioPagina) || 1;
  }

  setPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  get usuariosFiltradosSinPaginar(): Usuario[] {
    let res = this.usuarios;
    if (this.filtroRol) {
      res = res.filter(u => u.rol === this.filtroRol);
    }
    if (this.filtroBusqueda) {
      res = res.filter(u =>
        (u.nombre + ' ' + u.apellido + ' ' + u.email)
          .toLowerCase()
          .includes(this.filtroBusqueda.toLowerCase())
      );
    }
    return res;
  }

  get usuariosFiltrados(): Usuario[] {
    const filtrados = this.usuariosFiltradosSinPaginar;
    const inicio = (this.paginaActual - 1) * this.tamanioPagina;
    return filtrados.slice(inicio, inicio + this.tamanioPagina);
  }
}
