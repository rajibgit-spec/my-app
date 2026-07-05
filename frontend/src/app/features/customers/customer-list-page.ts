import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { PageHeader } from '../../shared/components/page-header/page-header';

@Component({
  selector: 'app-customer-list-page',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, MatIconModule, PageHeader],
  templateUrl: './customer-list-page.html',
  styleUrl: './customer-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListPage {
  readonly displayedColumns = ['name', 'email', 'tier', 'orders', 'status'];
  readonly customers = signal([
    { name: 'Mina Alvarez', email: 'mina@example.com', tier: 'VIP', orders: 18, status: 'Active' },
    { name: 'Joel Brown', email: 'joel@example.com', tier: 'Gold', orders: 12, status: 'Active' },
    { name: 'Sage Chen', email: 'sage@example.com', tier: 'Silver', orders: 7, status: 'Pending' }
  ]);
}
