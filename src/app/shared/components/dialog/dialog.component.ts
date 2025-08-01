import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  title = input.required<string>();

  onClose = output<void>();
  onSubmit = output<void>();

  close(): void {
    this.onClose.emit();
  }

  submit(): void {
    this.onSubmit.emit();
  }
}
