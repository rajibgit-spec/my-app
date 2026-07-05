import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-action-menu',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './action-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionMenu {
  readonly label = input<string>('Actions');
  readonly edit = output<void>();
  readonly archive = output<void>();
}
