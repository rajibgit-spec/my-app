import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-form-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    PageHeader
  ],
  template: `
    <app-page-header
      [eyebrow]="isEditMode() ? 'Edit' : 'Create'"
      [title]="isEditMode() ? 'Edit product' : 'Add product'"
      [description]="isEditMode() ? 'Adjust pricing, availability, and visuals for this listing.' : 'Create a new product listing with rich metadata.'"
    ></app-page-header>

    <div class="form-grid">
      <mat-card class="panel">
        <form [formGroup]="productForm" (ngSubmit)="submit()" class="product-form">
          <mat-form-field appearance="outline">
            <mat-label>Product name</mat-label>
            <input matInput formControlName="name" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>SKU</mat-label>
            <input matInput formControlName="sku" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Category</mat-label>
            <mat-select formControlName="category">
              <mat-option value="Audio">Audio</mat-option>
              <mat-option value="Wearables">Wearables</mat-option>
              <mat-option value="Displays">Displays</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Price</mat-label>
            <input matInput type="number" formControlName="price" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Stock</mat-label>
            <input matInput type="number" formControlName="stock" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Image URL</mat-label>
            <input matInput formControlName="imageUrl" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Status</mat-label>
            <mat-select formControlName="status">
              <mat-option value="In stock">In stock</mat-option>
              <mat-option value="Low stock">Low stock</mat-option>
              <mat-option value="Out of stock">Out of stock</mat-option>
            </mat-select>
          </mat-form-field>

          <div class="actions">
            <button mat-stroked-button type="button" (click)="router.navigateByUrl('/products')">Cancel</button>
            <button mat-flat-button color="primary" type="submit" [disabled]="productForm.invalid">Save product</button>
          </div>
        </form>
      </mat-card>

      <mat-card class="panel preview-card">
        <div class="preview-head">
          <p class="eyebrow">Preview</p>
          <h3>{{ productForm.value.name || 'Product title' }}</h3>
        </div>
        <img [src]="previewUrl() || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'" alt="Product preview" />
        <div class="meta">
          <p><strong>Status:</strong> {{ productForm.value.status || 'In stock' }}</p>
          <p><strong>Price:</strong> \${{ productForm.value.price || 0 }}</p>
          <p><strong>Stock:</strong> {{ productForm.value.stock || 0 }}</p>
        </div>
      </mat-card>
    </div>
  `,
  styleUrl: './product-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormPage implements OnInit {
  private readonly service = inject(ProductsService);
  readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isEditMode = signal(false);
  readonly previewUrl = signal('');

  readonly productForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    sku: new FormControl('', Validators.required),
    category: new FormControl('Audio', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)]),
    imageUrl: new FormControl('', Validators.required),
    status: new FormControl('In stock', Validators.required),
    rating: new FormControl(4.5)
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.service.getProduct(Number(id)).subscribe((product) => {
        if (product) {
          this.productForm.patchValue(product);
          this.previewUrl.set(product.imageUrl);
        }
      });
    }

    this.productForm.get('imageUrl')?.valueChanges.subscribe((value) => this.previewUrl.set(value ?? ''));
  }

  submit(): void {
    if (this.productForm.invalid) {
      return;
    }

    const payload = this.productForm.getRawValue() as Product;
    const request = this.isEditMode() ? this.service.updateProduct(payload) : this.service.createProduct(payload);

    request.subscribe(() => this.router.navigateByUrl('/products'));
  }
}
