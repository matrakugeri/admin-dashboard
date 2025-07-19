import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  imports: [HeaderComponent, DialogComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  isVisible = signal<boolean>(false);

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    job: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    archived: new FormControl(false, Validators.required),
  });

  onChangeDialogVisibility() {
    this.isVisible.set(!this.isVisible());
  }
}
