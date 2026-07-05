import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { PageHeader } from '../../shared/components/page-header/page-header';

@Component({
  selector: 'app-order-management-page',
  standalone: true,
  imports: [MatCardModule, MatTabsModule, MatChipsModule, PageHeader],
  template: `
    <app-page-header
      eyebrow="Orders"
      title="Order operations"
      description="Track fulfillment, support urgent purchases, and keep customer commitments on schedule."
    ></app-page-header>

    <mat-card class="panel">
      <mat-tab-group>
        <mat-tab label="Pending">
          <div class="tab-content">
            @for (order of pendingOrders(); track order.id) {
              <article class="order-card">
                <div>
                  <h3>#{{ order.id }} · {{ order.customer }}</h3>
                  <p>{{ order.items }} items · {{ order.region }}</p>
                </div>
                <mat-chip-set>
                  <mat-chip>{{ order.status }}</mat-chip>
                </mat-chip-set>
              </article>
            }
          </div>
        </mat-tab>
        <mat-tab label="Fulfilled">
          <div class="tab-content">
            @for (order of fulfilledOrders(); track order.id) {
              <article class="order-card">
                <div>
                  <h3>#{{ order.id }} · {{ order.customer }}</h3>
                  <p>{{ order.items }} items · {{ order.region }}</p>
                </div>
                <mat-chip-set>
                  <mat-chip color="accent">{{ order.status }}</mat-chip>
                </mat-chip-set>
              </article>
            }
          </div>
        </mat-tab>
        <mat-tab label="Returns">
          <div class="tab-content">
            @for (order of returnsOrders(); track order.id) {
              <article class="order-card">
                <div>
                  <h3>#{{ order.id }} · {{ order.customer }}</h3>
                  <p>{{ order.items }} items · {{ order.region }}</p>
                </div>
                <mat-chip-set>
                  <mat-chip color="warn">{{ order.status }}</mat-chip>
                </mat-chip-set>
              </article>
            }
          </div>
        </mat-tab>
      </mat-tab-group>
    </mat-card>
  `,
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
