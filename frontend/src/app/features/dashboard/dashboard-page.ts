import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { StatsCard } from '../../shared/components/stats-card/stats-card';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [MatCardModule, PageHeader, StatsCard],
  template: `
    <app-page-header
      eyebrow="Performance"
      title="Revenue overview"
      description="Monitor sales momentum, customer health, and stock position for the week."
    ></app-page-header>

    <section class="stats-grid">
      <app-stats-card icon="payments" label="Revenue" value="$184.2K" delta="▲ 12.4%" tone="violet"></app-stats-card>
      <app-stats-card icon="shopping_bag" label="Orders" value="1,248" delta="▲ 8.1%" tone="emerald"></app-stats-card>
      <app-stats-card icon="group" label="Users" value="16,240" delta="▲ 5.6%" tone="amber"></app-stats-card>
      <app-stats-card icon="inventory_2" label="Inventory" value="92%" delta="▼ 1.4%" tone="rose"></app-stats-card>
    </section>

    <section class="dashboard-grid">
      <mat-card class="panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Sales</p>
            <h3>Weekly momentum</h3>
          </div>
          <span class="pill">+24% vs last week</span>
        </div>
        <div class="chart-placeholder">
          <div class="bars">
            @for (bars of [36, 58, 45, 80, 70, 95, 110]; track bars) {
              <div class="bar" [style.height.%]="bars"></div>
            }
          </div>
        </div>
      </mat-card>

      <mat-card class="panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Focus</p>
            <h3>Upcoming actions</h3>
          </div>
        </div>
        <ul class="tasks">
          <li><strong>Restock</strong> premium speakers in North hub</li>
          <li><strong>Approve</strong> 7 pending bulk orders</li>
          <li><strong>Follow up</strong> with 3 VIP customers</li>
        </ul>
      </mat-card>
    </section>
  `,
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {}
