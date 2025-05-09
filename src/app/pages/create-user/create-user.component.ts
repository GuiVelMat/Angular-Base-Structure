import { Component } from '@angular/core';
import { createToast } from '../../Utils/create-toastr';
import { CreateUserFormComponent } from '../../shared/forms/create-user-form/create-user-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user',
  imports: [CreateUserFormComponent, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  onSuccessToastr() {
    createToast.success("Success", "user created");
  }

  onErrorToastr() {
    createToast.error("Error", "An error has ocurred");
  }
}
