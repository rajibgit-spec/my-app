import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <article class="stats-card">
      <div class="icon-wrap" [class]="tone()">
        <mat-icon>{{ icon() }}</mat-icon>
      </div>
      <div>
        <p class="label">{{ label() }}</p>
        <h3>{{ value() }}</h3>
        <span class="delta">{{ delta() }}</span>
      </div>
    </article>
  `,
  styleUrl: './stats-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsCard {
  readonly icon = input.required<string>();
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly delta = input.required<string>();
  readonly tone = input<'violet' | 'emerald' | 'amber' | 'rose'>('violet');
}
