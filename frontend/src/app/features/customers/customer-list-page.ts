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
  template: `
    <app-page-header
      eyebrow="Customers"
      title="Customer roster"
      description="Monitor lifecycle value and engagement across your highest-performing segments."
    ></app-page-header>

    <mat-card class="panel">
      <table mat-table [dataSource]="customers()" class="customer-table">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let customer">{{ customer.name }}</td>
        </ng-container>
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef>Email</th>
          <td mat-cell *matCellDef="let customer">{{ customer.email }}</td>
        </ng-container>
        <ng-container matColumnDef="tier">
          <th mat-header-cell *matHeaderCellDef>Tier</th>
          <td mat-cell *matCellDef="let customer">{{ customer.tier }}</td>
        </ng-container>
        <ng-container matColumnDef="orders">
          <th mat-header-cell *matHeaderCellDef>Orders</th>
          <td mat-cell *matCellDef="let customer">{{ customer.orders }}</td>
        </ng-container>
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let customer">
            <span class="status-pill active">{{ customer.status }}</span>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </mat-card>
  `,
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
