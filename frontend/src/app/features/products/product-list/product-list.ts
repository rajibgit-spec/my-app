import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { ActionMenu } from '../../../shared/components/action-menu/action-menu';
import { Product, ProductFilters } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    PageHeader,
    EmptyState,
    ActionMenu
  ],
  template: `
    <app-page-header
      eyebrow="Catalog"
      title="Products"
      description="Curate inventory, adjust pricing, and ship high-performing SKUs."
      actionLabel="Add product"
      (action)="goToNew()"
    ></app-page-header>

    <mat-card class="panel">
      <form [formGroup]="filtersForm" class="filters">
        <mat-form-field appearance="outline">
          <mat-label>Search</mat-label>
          <input matInput formControlName="search" placeholder="Search by name or SKU" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Category</mat-label>
          <mat-select formControlName="category">
            <mat-option value="">All</mat-option>
            <mat-option value="Audio">Audio</mat-option>
            <mat-option value="Wearables">Wearables</mat-option>
            <mat-option value="Displays">Displays</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Status</mat-label>
          <mat-select formControlName="status">
            <mat-option value="">All</mat-option>
            <mat-option value="In stock">In stock</mat-option>
            <mat-option value="Low stock">Low stock</mat-option>
            <mat-option value="Out of stock">Out of stock</mat-option>
          </mat-select>
        </mat-form-field>
      </form>

      @if (filteredProducts().length) {
        <div class="table-wrapper">
          <table mat-table [dataSource]="filteredProducts()" class="product-table">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Name</th>
              <td mat-cell *matCellDef="let product">
                <div class="product-cell">
                  <img [src]="product.imageUrl" [alt]="product.name" />
                  <div>
                    <strong>{{ product.name }}</strong>
                    <p>{{ product.sku }}</p>
                  </div>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="category">
              <th mat-header-cell *matHeaderCellDef>Category</th>
              <td mat-cell *matCellDef="let product">{{ product.category }}</td>
            </ng-container>

            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef>Price</th>
              <td mat-cell *matCellDef="let product">\${{ product.price }}</td>
            </ng-container>

            <ng-container matColumnDef="stock">
              <th mat-header-cell *matHeaderCellDef>Stock</th>
              <td mat-cell *matCellDef="let product">{{ product.stock }}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let product">
                <span class="status-pill" [class]="statusClass(product.status)">{{ product.status }}</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let product">
                <app-action-menu (edit)="goToEdit(product.id)" (archive)="archiveProduct(product.id)"></app-action-menu>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </div>
      } @else {
        <app-empty-state
          icon="inventory_2"
          title="No products match the current filters"
          description="Try refining your search or add a new product to expand the catalog."
          actionLabel="Add product"
          (action)="goToNew()"
        ></app-empty-state>
      }
    </mat-card>
  `,
  styleUrl: './product-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductList implements OnInit {
  private readonly service = inject(ProductsService);
  private readonly router = inject(Router);

  readonly displayedColumns = ['name', 'category', 'price', 'stock', 'status', 'actions'];
  readonly products = signal<Product[]>([]);
  readonly filteredProducts = signal<Product[]>([]);

  readonly filtersForm = new FormGroup({
    search: new FormControl(''),
    category: new FormControl(''),
    status: new FormControl('')
  });

  ngOnInit(): void {
    this.service.getProducts().subscribe((products) => {
      this.products.set(products);
      this.applyFilters();
    });

    this.filtersForm.valueChanges.subscribe(() => this.applyFilters());
  }

  goToNew(): void {
    this.router.navigateByUrl('/products/new');
  }

  goToEdit(id: number): void {
    this.router.navigateByUrl(`/products/${id}/edit`);
  }

  archiveProduct(id: number): void {
    this.products.update((items) => items.filter((product) => product.id !== id));
    this.applyFilters();
  }

  statusClass(status: Product['status']): string {
    return status === 'In stock' ? 'success' : status === 'Low stock' ? 'warning' : 'danger';
  }

  private applyFilters(): void {
    const filters = this.filtersForm.getRawValue() as ProductFilters;
    const normalized = filters.search?.toLowerCase() ?? '';
    const category = filters.category ?? '';
    const status = filters.status ?? '';

    const next = this.products().filter((product) => {
      const matchesSearch = !normalized || product.name.toLowerCase().includes(normalized) || product.sku.toLowerCase().includes(normalized);
      const matchesCategory = !category || product.category === category;
      const matchesStatus = !status || product.status === status;
      return matchesSearch && matchesCategory && matchesStatus;
    });

    this.filteredProducts.set(next);
  }
}
