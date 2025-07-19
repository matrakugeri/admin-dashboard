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
  visible = input<boolean>(false);

  onClose = output<void>();
  onSave = output<void>();

  close(): void {
    this.onClose.emit();
  }

  save(): void {
    this.onSave.emit();
  }
}
