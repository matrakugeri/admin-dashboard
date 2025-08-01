import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../pages/admin-dashboard/models/user.model';
import { debounceTime } from 'rxjs';

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
        font-size: 16px;
      }
    `,
  ],
})
export class TableComponent {
  originalRows = input<any[]>([]);
  searchPlaceholder = input<boolean>(true);
  searchChanged = output<string>();
  onClear = output<void>();
  search = new FormControl('');

  readonly headerTpl = contentChild<TemplateRef<void>>('header');
  readonly filterTpl = contentChild<TemplateRef<void>>('filter');
  readonly bodyTpl = contentChild<TemplateRef<BodyContext<User>>>('body');

  ngOnInit() {
    if (this.searchPlaceholder()) {
      if (this.searchPlaceholder()) {
        this.search.valueChanges
          .pipe(debounceTime(300))
          .subscribe((val) => this.searchChanged.emit(val ?? ''));
      }
    }
  }
}
