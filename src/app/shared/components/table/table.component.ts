import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [ReactiveFormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  originalRows = [
    {
      firstName: 'Alice',
      lastName: 'Smith',
      gender: 'female',
      job: 'Engineer',
      date: '05/28/2005',
      archived: false,
    },
    {
      firstName: 'Bob',
      lastName: 'Brown',
      gender: 'male',
      job: 'Designer',
      date: '06/08/2002',
      archived: true,
    },
    {
      firstName: 'Charlie',
      lastName: 'Davis',
      gender: 'male',
      job: 'Manager',
      date: '08/15/2007',
      archived: true,
    },
  ];
}
