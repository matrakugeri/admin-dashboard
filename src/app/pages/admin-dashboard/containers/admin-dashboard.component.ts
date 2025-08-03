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
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    DialogComponent,
    UsersFormComponent,
    ReactiveFormsModule,
    UsersTableComponent,
    AsyncPipe,
    SpinnerComponent,
    PaginatorComponent,
  ],
  providers: [UsersStore],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  isVisible = signal<boolean>(false);
  mode = signal<'edit' | 'create'>('create');
  route = inject(ActivatedRoute);
  store = inject(UsersStore);
  router = inject(Router);
  usersService = inject(UsersService);

  currentUserId = signal<number | null>(null);
  isDeleteUserDialog = signal<boolean>(false);
  showToastMessage = signal<boolean>(false);

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

  onPageChange(event: number) {
    const currentParams = this.route.snapshot.queryParams;
    this.store.load({ ...currentParams, start: event, limit: 10 });
    this.router.navigate([''], {
      queryParams: {
        ...currentParams,
        start: event,
        limit: 10,
      },
    });
  }

  onSearchByKeyword(value: string) {
    const keyword = value.trim() || null;
    this.store.load({ keyword, start: 0, limit: 10 });
    const currentParams = this.route.snapshot.queryParams;
    this.router.navigate([''], {
      queryParams: {
        ...currentParams,
        start: 0,
        limit: 10,
        keyword,
      },
    });
  }

  onTableFiltersSearch(value: Omit<UserFilters, 'keyword'>) {
    console.log(value);
    this.store.load({ ...value, start: 0, limit: 10 });
    const formValues = {
      firstName: value.firstName || null,
      lastName: value.lastName || null,
      job: value.job || null,
      gender: value.gender || null,
      date: value.date || null,
      archived: value.archived || null,
    };
    const currentParams = this.route.snapshot.queryParams;
    this.router.navigate([''], {
      queryParams: {
        ...currentParams,
        ...formValues,
        start: 0,
        limit: 10,
      },
    });
  }

  onClear(params: UserFilters) {
    this.store.load({ ...params, start: 0, limit: 10 });
    this.router.navigate([''], {
      queryParams: {},
    });
    console.log(params);
  }

  handleUserEdit(row: User) {
    this.currentUserId.set(row.id);
    this.onOpenDialog('edit', row);
  }

  handleUserDelete(row: User) {
    this.currentUserId.set(row.id);
    this.isDeleteUserDialog.set(true);
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
    this.mode.set(mode);
    console.log(this.mode(), mode);
    console.log(this.form.value);
    if (this.mode() === 'edit' && user) {
      this.form.patchValue(user);
    }
    this.isVisible.set(true);
  }

  onDeleteUser() {
    const id = this.currentUserId();
    if (!id) return;
    this.store.deleteUser(this.currentUserId()!);
    this.isDeleteUserDialog.set(false);
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.mode() === 'create') {
      this.store.createUser(this.form.getRawValue());
      this.isVisible.set(false);
      console.log(this.form.value);
    } else if (this.mode() === 'edit') {
      const id = this.currentUserId();
      if (!id) return;
      console.log(this.form.value);
      const updatedUser: User = { id, ...this.form.getRawValue() };
      console.log(updatedUser);
      this.store.updateUser(updatedUser);
      this.isVisible.set(false);
    }
  }

  onSort(sortData: {
    sortField: string | null;
    sortDirection: 'asc' | 'desc' | null;
  }) {
    this.store.load(sortData);
    const currentParams = this.route.snapshot.queryParams;
    this.router.navigate([''], {
      queryParams: {
        ...currentParams,
        ...sortData,
      },
    });
  }
}
