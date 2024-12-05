import { Component, effect, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ListProducts } from '../../models/products.dtos';
import { ProductListItemComponent } from '../product-list-item/product-list-item.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductListItemComponent, MatPaginatorModule],
  template: `
<div class="products">
  @for (product of productsResult.products; track product.id) {
      <app-product-list-item [product]="product" [deleteProductParent]="deleteProduct.bind(this)" />
  }
</div>
  <div class="paginator">
    <mat-paginator [length]="productsResult.total"
                  [pageSize]="pageSize()"   
                  [pageSizeOptions]="[9,50,100]"       
                  aria-label="Select product page"
                  (page)="onPageChange($event)" />
  </div>
  `,
  styles: [``]
})
export class ProductsComponent {

  api = inject(ProductsService);

  productsResult: ListProducts = {};

  page = signal(1); // Current page number
  pageSize = signal(10); // Items per page

  private _snackBar = inject(MatSnackBar);



  constructor() {
    this.loadProducts();

    effect(() => {
      this.loadProducts();
    });
  }

  loadProducts() {
    this.api.getProducts('', this.page(), this.pageSize()).subscribe(data => {
      this.productsResult = data;
    });
  }

  deleteProduct(id: number) {
    console.log('log from parent ', id);
    this.api.deleteProduct(id).subscribe(() => {
      this.productsResult.products = this.productsResult.products?.filter(x => x.id != id);
      this._snackBar.open('Product deleted succesfully!', 'Ok');

    });
  }

  onPageChange(event: any) {
    this.page.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
  }

}
