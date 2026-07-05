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
  templateUrl: './product-list.html',
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
