import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-form',
  imports: [ReactiveFormsModule],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss',
})
export class UsersFormComponent {
  form = input.required<FormGroup>();
}
