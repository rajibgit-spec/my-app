import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryCard {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly body = input.required<string>();
}
