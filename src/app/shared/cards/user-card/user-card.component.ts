import { CommonModule } from "@angular/common"
import { Component, inject, Input } from "@angular/core"
import type { User } from "../../../core/models/User"
import { UserStore } from "../../../Store/user.store";
import { Router } from "@angular/router";
import { ConfirmDialogComponent } from "../../ui/confirm-dialog/confirm-dialog.component";
import { createToast } from "../../../Utils/create-toastr";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "card-user",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./user-card.component.html",
  styleUrl: "./user-card.component.css",
})
export class UserCardComponent {
  @Input() user?: User
  readonly userStore = inject(UserStore);
  private router = inject(Router);
  showFullDetails = false

  constructor(public dialog: MatDialog) { }

  toggleDetails() {
    this.showFullDetails = !this.showFullDetails
  }

  editUser() {
    if (this.user) {
      this.userStore.saveUserToEdit(this.user)
      this.router.navigate(["/EditUser"])
    }
  }

  deleteUser(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: '¿Seguro que quieres eliminar el usuario?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          this.userStore.deleteUser(this.user?.id || 0);

          createToast.success("Éxito", "Usuario eliminado");
        } catch (error) {
          createToast.error("Error", "Ha ocurrido un error al eliminar el usuario");
        }

        // setTimeout(() => {
        //   this.router.navigate(["/"]);
        // }, 300);
      }
    })
  }
}

