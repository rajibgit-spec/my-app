import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <mat-card class="product-card">
      <img [src]="product().imageUrl" [alt]="product().name" />
      <div class="card-body">
        <div class="card-head">
          <div>
            <h3>{{ product().name }}</h3>
            <p>{{ product().sku }}</p>
          </div>
          <span class="price">\${{ product().price }}</span>
        </div>
        <div class="actions">
          <button mat-stroked-button (click)="edit.emit(product().id)">Edit</button>
          <button mat-flat-button color="primary" (click)="view.emit(product().id)">View</button>
        </div>
      </div>
    </mat-card>
  `,
  styleUrl: './product-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly edit = output<number>();
  readonly view = output<number>();
}
