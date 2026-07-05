import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ProductFormPage } from './product-form';

describe('ProductFormPage', () => {
  let component: ProductFormPage;
  let fixture: ComponentFixture<ProductFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormPage],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
