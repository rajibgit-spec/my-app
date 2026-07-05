import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <header class="page-header">
      <div>
        <p class="eyebrow">{{ eyebrow() }}</p>
        <h2>{{ title() }}</h2>
        <p class="description">{{ description() }}</p>
      </div>
      @if (actionLabel(); as actionLabel) {
        <button mat-flat-button color="primary" (click)="action.emit()">
          <mat-icon>add</mat-icon>
          {{ actionLabel }}
        </button>
      }
    </header>
  `,
  styleUrl: './page-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeader {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input<string>('');
  readonly actionLabel = input<string>('');
  readonly action = output<void>();
}
