import { Injectable, signal } from '@angular/core';
import { ToastActionsMessages } from '../../shared/models/toast-actions-messages.enum';

export interface ToastMessage {
  type: 'success' | 'error' | 'info';
  message: ToastActionsMessages;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toast = signal<ToastMessage | null>(null);

  show(operation: ToastMessage) {
    this.toast.set({ type: operation.type, message: operation.message });
    setTimeout(() => this.toast.set(null), 3000);
  }
}
