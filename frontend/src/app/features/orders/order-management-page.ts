import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { PageHeader } from '../../shared/components/page-header/page-header';

@Component({
  selector: 'app-order-management-page',
  standalone: true,
  imports: [MatCardModule, MatTabsModule, MatChipsModule, PageHeader],
  templateUrl: './order-management-page.html',
  styleUrl: './order-management-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderManagementPage {
  readonly pendingOrders = signal([
    { id: 1042, customer: 'Mina Alvarez', items: 3, region: 'Seattle', status: 'Pending' },
    { id: 1043, customer: 'Joel Brown', items: 2, region: 'Denver', status: 'Pending' }
  ]);

  readonly fulfilledOrders = signal([
    { id: 1038, customer: 'Alicia Stone', items: 5, region: 'Austin', status: 'Fulfilled' },
    { id: 1039, customer: 'Nico Patel', items: 1, region: 'Boston', status: 'Fulfilled' }
  ]);

  readonly returnsOrders = signal([
    { id: 1028, customer: 'Sage Chen', items: 1, region: 'Miami', status: 'Return requested' }
  ]);
}
