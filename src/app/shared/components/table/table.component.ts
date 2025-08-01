import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../pages/admin-dashboard/models/user.model';
import { debounceTime } from 'rxjs';
import { TableColumns } from '../../models/table-columns.model';

interface BodyContext<T> {
  row: T;
}

@Component({
  selector: 'app-table',
  imports: [ReactiveFormsModule, NgTemplateOutlet],
  templateUrl: './table.component.html',
  styles: [
    `
      .paragraph__no-data {
        padding: var(--spacing-20) 0 var(--spacing-20) var(--spacing-12);
        font-size: var(--font-16);
      }
    `,
  ],
})
export class TableComponent {
  originalRows = input<any[]>([]);
  columns = input<TableColumns[]>([]);
  searchPlaceholder = input<boolean>(true);
  searchChanged = output<string>();
  onClear = output<void>();
  search = new FormControl('');
  sortChanged = output<{
    sortDirection: 'asc' | 'desc' | null;
    sortField: string | null;
  }>();

  sortField = signal<string | null>(null);
  sortDirection = signal<'asc' | 'desc' | null>('asc');

  readonly headerTpl = contentChild<TemplateRef<void>>('header');
  readonly filterTpl = contentChild<TemplateRef<void>>('filter');
  readonly bodyTpl = contentChild<TemplateRef<BodyContext<User>>>('body');

  ngOnInit() {
    if (this.searchPlaceholder()) {
      this.search.valueChanges
        .pipe(debounceTime(300))
        .subscribe((val) => this.searchChanged.emit(val ?? ''));
    }
  }

  toggleSort(field: string) {
    if (this.sortField() === field) {
      const next =
        this.sortDirection() === null
          ? 'asc'
          : this.sortDirection() === 'asc'
          ? 'desc'
          : null;

      this.sortDirection.set(next);

      if (next === null) {
        this.sortField.set(null);
      }
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }

    this.sortChanged.emit({
      sortField: this.sortField(),
      sortDirection: this.sortDirection(),
    });
  }

  clear() {
    this.search.reset('', { emitEvent: false });
    this.sortDirection.set(null);
    this.onClear.emit();
  }
}
