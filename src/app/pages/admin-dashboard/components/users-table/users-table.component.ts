import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User, UserFilters } from '../../models/user.model';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TableColumns } from '../../../../shared/models/table-columns.model';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-users-table',
  imports: [ReactiveFormsModule, TableComponent],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent {
  originalRows = input<User[]>([]);
  searchChanged = output<string>();
  filtersChanged = output<UserFilters>();
  onClear = output<any>();

  form = new FormGroup({
    firstName: new FormControl('', { nonNullable: true }),
    lastName: new FormControl('', { nonNullable: true }),
    gender: new FormControl('', { nonNullable: true }),
    job: new FormControl('', { nonNullable: true }),
    date: new FormControl('', { nonNullable: true }),
    archived: new FormControl<boolean | string>('', { nonNullable: true }), // boolean or string so we can keep the select option displayed initially, just a design optimization
  });

  columns: TableColumns[] = [
    { field: 'firstName', header: 'First Name', type: 'text' },
    { field: 'lastName', header: 'Last Name', type: 'text' },
    { field: 'job', header: 'Job', type: 'text' },
    {
      field: 'gender',
      header: 'Gender',
      type: 'select',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ],
    },
    {
      field: 'date',
      header: 'Date',
      type: 'date',
    },
    {
      field: 'archived',
      header: 'Archived',
      type: 'select',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    {
      field: 'actions',
      header: 'Actions',
      type: 'actions',
    },
  ];

  ngOnInit() {
    this.form.valueChanges.pipe(debounceTime(200)).subscribe((res) => {
      console.log(res);
      const formData = res as UserFilters;
      this.filtersChanged.emit(formData);
    });
  }

  onEdit = output<User>();
  onDelete = output<User>();

  editRow(row: User) {
    console.log(row);
    this.onEdit.emit(row);
  }

  deleteRow(row: User) {
    console.log(row);
    this.onDelete.emit(row);
  }

  clear() {
    const reset = {
      firstName: '',
      lastName: '',
      gender: '',
      job: '',
      date: '',
      archived: '',
    };
    this.form.reset(reset, { emitEvent: false });
    this.onClear.emit({ ...reset, keyword: null });
  }
}
