import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <section class="empty-state">
      <div class="icon-wrap">
        <mat-icon>{{ icon() }}</mat-icon>
      </div>
      <h3>{{ title() }}</h3>
      <p>{{ description() }}</p>
      @if (actionLabel()) {
        <button mat-stroked-button color="primary" (click)="action.emit()">{{ actionLabel() }}</button>
      }
    </section>
  `,
  styleUrl: './empty-state.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyState {
  readonly icon = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly actionLabel = input<string>('');
  readonly action = output<void>();
}
