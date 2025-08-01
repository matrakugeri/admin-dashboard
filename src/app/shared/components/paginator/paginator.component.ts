import { Component, input, output, computed } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: 'paginator.component.html',
  styleUrl: 'paginator.component.scss',
})
export class PaginatorComponent {
  start = input<number>(0); // zero-based
  totalRecords = input<number>(0);
  limit = input<number>(10);

  pageChange = output<number>();

  readonly currentPage = computed(
    () => Math.floor(this.start() / this.limit()) + 1
  );

  readonly totalPages = computed(() =>
    Math.ceil(this.totalRecords() / this.limit())
  );

  readonly pages = computed(() => {
    const pagesToShow = 3;
    let start = Math.max(this.currentPage() - 1, 1);
    let end = Math.min(start + pagesToShow - 1, this.totalPages());
    if (end - start < pagesToShow - 1) {
      start = Math.max(end - pagesToShow + 1, 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      const newStart = (page - 1) * this.limit();
      this.pageChange.emit(newStart);
    }
  }

  goFirst() {
    this.goToPage(1);
  }

  goLast() {
    this.goToPage(this.totalPages());
  }

  goNext() {
    this.goToPage(this.currentPage() + 1);
  }

  goPrev() {
    this.goToPage(this.currentPage() - 1);
  }
}
