import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import {  FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors,  ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../state/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
  ]
})
export class UsuarioFormComponent implements OnChanges {
  form: FormGroup;
  errorMsg: string | null = null;
  modoEditar = false;

  @Input() usuarioEdit: Usuario | null = null;
  @Input() usuarios: Usuario[] = [];
  @Output() limpiarEdit = new EventEmitter<void>();
  @Output() usuarioAgregado = new EventEmitter<void>();
  @Output() agregandoUsuario = new EventEmitter<boolean>();  
  @Output() usuarioActualizado = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, this.emailDuplicadoValidator.bind(this)]],
      rol: ['User'],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['usuarioEdit']) {
      if (this.usuarioEdit) {
        this.form.patchValue(this.usuarioEdit);
        this.modoEditar = true;
      } else {
        this.form.reset({ rol: 'User' });
        this.modoEditar = false;
      }
      this.errorMsg = null;
    }
    if (changes['usuarios'] || changes['usuarioEdit']) {
      this.form.get('email')?.updateValueAndValidity();
    }
  }

    emailDuplicadoValidator(control: AbstractControl): ValidationErrors | null {
    if (!this.usuarios || !control.value) return null;
    const email = control.value.trim().toLowerCase();
    const usuarioId = this.usuarioEdit ? this.usuarioEdit.id : null;
    const existe = this.usuarios.some(u =>
      u.email.trim().toLowerCase() === email && (!usuarioId || u.id !== usuarioId)
    );
    return existe ? { emailDuplicado: true } : null;
  }

  submit() {
    if (this.form.invalid) return;
    this.agregandoUsuario.emit(true);

    // Validación de email duplicado
    const formEmail = this.form.value.email?.toLowerCase().trim();
    const usuarioId = this.usuarioEdit ? this.usuarioEdit.id : null;
    const yaExiste = this.usuarios.some(u =>
      u.email?.toLowerCase().trim() === formEmail &&
      (!usuarioId || u.id !== usuarioId)
    );
    if (yaExiste) {
      this.errorMsg = 'Ya existe un usuario con ese email';
      this.agregandoUsuario.emit(false);
      return;
    }

    if (this.modoEditar && this.usuarioEdit) {
      // Actualizar
      const usuarioActualizado = { ...this.usuarioEdit, ...this.form.value };
      this.usuarioService.updateUsuario(usuarioActualizado).subscribe({
        next: () => {
          this.usuarioActualizado.emit();
          this.form.reset({ rol: 'User' });
          this.limpiarEdit.emit();
          this.agregandoUsuario.emit(false);
        },
        error: (err) => {
          this.errorMsg = err?.error?.message || 'Error al actualizar';
          this.agregandoUsuario.emit(false);
        }
      });
    } else {
      // Agregar
      this.usuarioService.addUsuario(this.form.value as Omit<Usuario, 'id'>).subscribe({
        next: () => {
          this.usuarioAgregado.emit();
          this.form.reset({ rol: 'User' });
          this.limpiarEdit.emit();
          this.agregandoUsuario.emit(false);
        },
        error: (err) => {
          this.errorMsg = err?.error?.message || 'Error al agregar';
          this.agregandoUsuario.emit(false);
        }
      });
    }
  }
}
