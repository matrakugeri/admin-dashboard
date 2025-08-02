import { Component, computed, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  template: `
    @if (toast()) {
    <div class="toast" [class]="toastType()">
      {{ toastMessage() }}
    </div>
    }
  `,
  styles: [
    `
      .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #333;
        color: white;
        padding: var(--spacing-12) var(--spacing-20);
        border-radius: 4px;
        opacity: 0.9;
        z-index: 9999;
        animation: fadeInOut 3s ease forwards;
      }

      .toast.success {
        background-color: #4caf50;
      }

      .toast.error {
        background-color: #f44336;
      }

      .toast.info {
        background-color: #2196f3;
      }

      @keyframes fadeInOut {
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        10% {
          opacity: 1;
          transform: translateY(0);
        }
        90% {
          opacity: 1;
        }
        100% {
          opacity: 0;
          transform: translateY(20px);
        }
      }
    `,
  ],
})
export class ToastComponent {
  toastService = inject(ToastService);
  toast = this.toastService.toast;
  toastMessage = computed(() => this.toast()?.message);
  toastType = computed(() => this.toast()?.type);
}
