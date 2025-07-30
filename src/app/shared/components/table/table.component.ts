import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
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
  styleUrl: './table.component.scss',
})
export class TableComponent {
  originalRows = input<any[]>([]);
  searchPlaceholder = input<boolean>(true);
  searchChanged = output<string>();
  onClear = output<void>();

  search = new FormControl('');

  // Templates
  @ContentChild('header') headerTpl?: TemplateRef<void>;
  @ContentChild('filter') filterTpl?: TemplateRef<void>;
  @ContentChild('body', { static: false }) bodyTpl!: TemplateRef<
    BodyContext<User>
  >;

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
