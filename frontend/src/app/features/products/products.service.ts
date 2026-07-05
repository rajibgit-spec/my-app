import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Product } from './product.model';
import { productsMock } from './mocks/products.mock';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly productsSubject = new BehaviorSubject<Product[]>(productsMock);

  getProducts(): Observable<Product[]> {
    if (environment.useMockData) {
      return of(this.productsSubject.value).pipe(delay(250));
    }

    return this.http.get<{ data: Product[]; meta: unknown }>(`${environment.apiUrl}/products`).pipe(
      map((response) => response.data),
      delay(250)
    );
  }

  getProduct(id: number): Observable<Product | undefined> {
    if (environment.useMockData) {
      return of(this.productsSubject.value.find((product) => product.id === id)).pipe(delay(200));
    }

    return this.http.get<{ data: Product }>(`${environment.apiUrl}/products/${id}`).pipe(
      map((response) => response.data),
      delay(200)
    );
  }

  createProduct(product: Product): Observable<Product> {
    if (environment.useMockData) {
      const nextProduct = { ...product, id: Date.now() };
      const updated = [nextProduct, ...this.productsSubject.value];
      this.productsSubject.next(updated);
      return of(nextProduct).pipe(delay(200));
    }

    return this.http.post<{ data: Product }>(`${environment.apiUrl}/products`, product).pipe(
      map((response) => response.data),
      delay(200)
    );
  }

  updateProduct(product: Product): Observable<Product> {
    if (environment.useMockData) {
      const updated = this.productsSubject.value.map((item) => (item.id === product.id ? product : item));
      this.productsSubject.next(updated);
      return of(product).pipe(delay(200));
    }

    return this.http.patch<{ data: Product }>(`${environment.apiUrl}/products/${product.id}`, product).pipe(
      map((response) => response.data),
      delay(200)
    );
  }
}
