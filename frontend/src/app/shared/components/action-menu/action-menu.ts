import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-action-menu',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="More actions">
      <mat-icon>more_horiz</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
      <button mat-menu-item (click)="edit.emit()">
        <mat-icon>edit</mat-icon>
        <span>Edit</span>
      </button>
      <button mat-menu-item (click)="archive.emit()">
        <mat-icon>archive</mat-icon>
        <span>Archive</span>
      </button>
    </mat-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionMenu {
  readonly label = input<string>('Actions');
  readonly edit = output<void>();
  readonly archive = output<void>();
}
