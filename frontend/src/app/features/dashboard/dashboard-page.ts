import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { StatsCard } from '../../shared/components/stats-card/stats-card';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [MatCardModule, PageHeader, StatsCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {}
