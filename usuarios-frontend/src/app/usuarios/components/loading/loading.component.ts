import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-loading',
  template: `
    <div class="loading" *ngIf="show">
      <mat-spinner></mat-spinner>
    </div>
  `,
  styles: [`
    .loading { display: flex; justify-content: center; margin: 2rem 0; }
  `],
  imports: [CommonModule, MatProgressSpinnerModule]
})
export class LoadingComponent {
  @Input() show = false;
}
