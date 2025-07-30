import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<span class="loader"></span>`,
  styles: [
    `
      .loader {
        width: 68px;
        height: 68px;
        color: black;
        border-radius: 50%;
        display: inline-block;
        border: 10px solid;
        text-align: center;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-color: var(--color-primary) var(--color-primary-light);
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
      }
    `,
  ],
})
export class SpinnerComponent {}
