import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserWithoutId } from '../../../core/models/User';
import { createToast } from '../../../Utils/create-toastr';
import { Router } from '@angular/router';
import { UserStore } from '../../../Store/user.store';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../ui/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-create-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.css'
})
export class CreateUserFormComponent implements OnInit {
  readonly userStore = inject(UserStore);
  private router = inject(Router);
  userForm!: FormGroup;
  isUserUpdate = false;
  submitted = false;

  constructor(private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initForm();

    if (window.location.pathname === "/CreateUser") {
      this.resetForm();
    }

    const userToEdit = this.userStore.userToEdit();
    if (userToEdit) {
      console.log(`Usuario a editar: ${userToEdit.nombre}`);
      this.loadUserData(userToEdit);
    }
  }

  initForm(): void {
    this.userForm = this.fb.group({
      id: [{ value: 0, disabled: false }],
      nombre: ["", [Validators.required, Validators.maxLength(50)]],
      cif: ["", [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      direccion: ["", [Validators.required, Validators.maxLength(70)]],
      telefono: ["", [Validators.required, Validators.pattern(/^\d{9}$/)]],
      observaciones: ["", [Validators.maxLength(200)]],
    })
  }

  loadUserData(user: User): void {
    this.isUserUpdate = true
    this.userForm.patchValue({
      id: user.id,
      nombre: user.nombre,
      cif: user.cif,
      direccion: user.direccion,
      telefono: user.telefono,
      observaciones: user.observaciones || "",
    })
    // Deshabilitar el campo ID en modo edición
    this.userForm.get("id")?.disable()
  }

  get f() {
    return this.userForm.controls
  }

  onSubmit(): void {
    this.submitted = true

    if (this.userForm.invalid) {
      return
    }

    const newUser: UserWithoutId = {
      nombre: this.userForm.value.nombre,
      cif: this.userForm.value.cif,
      direccion: this.userForm.value.direccion,
      telefono: this.userForm.value.telefono,
      observaciones: this.userForm.value.observaciones,
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: '¿Seguro que quieres actualizar este usuario?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          if (this.isUserUpdate) {
            // Uusario para edición
            const updatedUser: User = {
              id: this.userForm.getRawValue().id, // Obtener el valor aunque esté deshabilitado
              nombre: this.userForm.value.nombre,
              cif: this.userForm.value.cif,
              direccion: this.userForm.value.direccion,
              telefono: this.userForm.value.telefono,
              observaciones: this.userForm.value.observaciones,
            }

            this.userStore.updateUser(updatedUser)
            createToast.success("Éxito", "Usuario actualizado")
            this.router.navigate(["/"])
          } else {
            // Usuario para creación
            const newUser: User = {
              id: this.userForm.value.id,
              nombre: this.userForm.value.nombre,
              cif: this.userForm.value.cif,
              direccion: this.userForm.value.direccion,
              telefono: this.userForm.value.telefono,
              observaciones: this.userForm.value.observaciones,
            }

            this.userStore.createUser(newUser);
            createToast.success("Éxito", "Usuario creado");
            this.resetForm();
            this.router.navigate(["/"])
          }
        } catch (error) {
          const action = this.isUserUpdate ? "actualizar" : "crear";
          createToast.error("Error", `Ha ocurrido un error al ${action} el usuario`);
        }
      }
    });
  }

  resetForm(): void {
    this.submitted = false
    this.userForm.reset()
    this.isUserUpdate = false
    this.userStore.clearUserToEdit()
    this.userForm.get("id")?.enable()
  }

  cancelEdit(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: '¿Seguro que quieres cancelar la edición?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resetForm();
        this.router.navigate(["/"]);
      }
    })
  }
}
