import { Component, inject, signal } from '@angular/core';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UsersFormComponent } from '../components/users-form/users-form.component';
import { User, UserFilters } from '../models/user.model';
import { UsersTableComponent } from '../components/users-table/users-table.component';
import { take, tap, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersStore } from '../../../core/services/users.store';
import { AsyncPipe } from '@angular/common';
import { SpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    DialogComponent,
    UsersFormComponent,
    ReactiveFormsModule,
    UsersTableComponent,
    AsyncPipe,
    SpinnerComponent,
  ],
  providers: [UsersStore],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  isVisible = signal<boolean>(false);
  mode: string = 'create';
  route = inject(ActivatedRoute);
  store = inject(UsersStore);
  router = inject(Router);
  usersService = inject(UsersService);

  form = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    gender: new FormControl('', {
      validators: Validators.required,
    }),
    job: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    date: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    archived: new FormControl(false, { nonNullable: true }),
  });

  queryParams$ = this.route.queryParams.pipe(
    take(1),
    tap((params) => {
      console.warn(params);
      console.log(this.store.params);
      this.store.load(params);
    })
  );

  onSearchByKeyword(value: string) {
    const keyword = value.trim() || null;
    console.log(value);
    console.log(value || null);
    this.store.load({ keyword });
    const currentParams = this.route.snapshot.queryParams;
    console.log(currentParams);
    console.log({ ...currentParams, keyword });
    this.router.navigate([''], {
      queryParams: {
        ...currentParams,
        keyword,
      },
    });
  }

  onTableFiltersSearch(value: UserFilters) {
    console.log(value);
    this.store.load(value);
    const formValues = {
      firstName: value.firstName || null,
      lastName: value.lastName || null,
      job: value.job || null,
      gender: value.gender || null,
      date: value.date || null,
      archived: value.archived || null,
    };
    const currentParams = this.route.snapshot.queryParams;
    console.log({ ...currentParams, ...formValues });
    this.router.navigate([''], {
      queryParams: {
        ...currentParams,
        ...formValues,
      },
    });
  }

  onClear(params: UserFilters) {
    this.store.load(params);
    this.router.navigate([''], {
      queryParams: {},
    });
    console.log(params);
  }

  handleUserEdit(row: User) {
    this.onOpenDialog('edit', row);
  }

  handleUserDelete(row: User) {
    // this.usersService.deleteUser(row.id).subscribe({
    //   next: (res) => console.log(res),
    // });
  }

  onOpenDialog(mode: 'edit' | 'create', user?: User) {
    this.form.reset({
      firstName: '',
      lastName: '',
      gender: null,
      archived: false,
      date: '',
      job: '',
    });
    this.mode = mode;
    console.log(this.form.value);
    if (mode === 'edit' && user) {
      this.form.patchValue(user);
    }
    this.isVisible.set(true);
  }

  onCloseDialog() {
    this.isVisible.set(false);
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }
}
