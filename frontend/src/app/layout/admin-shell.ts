import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule
  ],
  templateUrl: './admin-shell.html',
  styleUrl: './admin-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminShell {
  private readonly router = inject(Router);
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isMobile = toSignal(
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(map((state) => state.matches)),
    { initialValue: false }
  );

  readonly navItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Products', icon: 'inventory_2', route: '/products' },
    { label: 'Orders', icon: 'shopping_cart', route: '/orders' },
    { label: 'Customers', icon: 'group', route: '/customers' }
  ];

  readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }

  goTo(route: string): void {
    this.router.navigateByUrl(route);
    this.menuOpen.set(false);
  }
}
