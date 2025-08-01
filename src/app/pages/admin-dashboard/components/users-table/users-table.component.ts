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
  onClear = output<UserFilters>();
  sortChanged = output<{
    sortField: string | null;
    sortDirection: 'asc' | 'desc' | null;
  }>();

  form = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    gender: new FormControl(null),
    job: new FormControl(null),
    date: new FormControl(null),
    archived: new FormControl(null),
  });

  columns: TableColumns[] = [
    { field: 'firstName', header: 'First Name', type: 'text', sortable: true },
    { field: 'lastName', header: 'Last Name', type: 'text', sortable: true },
    { field: 'job', header: 'Job', type: 'text', sortable: true },
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
      sortable: true,
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
      firstName: null,
      lastName: null,
      gender: null,
      job: null,
      date: null,
      archived: null,
    };
    this.form.reset(reset, { emitEvent: false });
    this.onClear.emit({ ...reset, keyword: null });
  }

  onSortChange(sortData: {
    sortField: string | null;
    sortDirection: 'asc' | 'desc' | null;
  }) {
    console.log(sortData);
    console.log(sortData, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    this.sortChanged.emit(sortData);
  }
}
