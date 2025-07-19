import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersFormComponent } from '../components/users-form/users-form.component';
import { User } from '../models/user.model';
import { TableComponent } from '../../../shared/components/table/table.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [DialogComponent, UsersFormComponent, TableComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  isVisible = signal<boolean>(false);
  mode: string = 'create';

  form = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    gender: new FormControl('', Validators.required),
    job: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    archived: new FormControl(false),
  });

  onOpenDialog(mode: 'edit' | 'create', user?: User) {
    this.mode = mode;
    console.log(this.form.value);
    if (mode === 'edit' && user) {
      // For edit mode we patch the form with the user data
      this.form.patchValue(user);
    }
    this.isVisible.set(true);
  }

  onCloseDialog() {
    this.isVisible.set(false);
    this.form.reset();
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
  }
}
