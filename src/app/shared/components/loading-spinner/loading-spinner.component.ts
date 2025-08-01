import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<div class="spinner-container justify-center d-flex items-center">
    <span class="loader"></span>
  </div>`,
  styles: [
    `
      .spinner-container {
        backdrop-filter: blur(2px);
        background-color: rgba(0, 0, 0, 0.1);
        max-width: 100%;
        max-height: 100%;
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 9999;
      }
      .loader {
        width: 68px;
        height: 68px;
        color: black;
        border-radius: 50%;
        display: inline-block;
        border: 10px solid;
        border-color: var(--color-primary) var(--color-primary-light);
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
      }
    `,
  ],
})
export class SpinnerComponent {}
