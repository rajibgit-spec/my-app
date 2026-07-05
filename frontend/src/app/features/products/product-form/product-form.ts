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
  templateUrl: './product-form.html',
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
