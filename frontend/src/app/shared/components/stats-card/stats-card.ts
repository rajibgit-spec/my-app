import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './stats-card.html',
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
