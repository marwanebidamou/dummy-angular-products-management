import { Component, inject, Input } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.dtos';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  imports: [],
  template: `

  <h1>{{ product.title }}</h1>
    <p>Category: {{ product.category }}</p>
    <p>Price: {{ product.price  }}</p>
    <p>Category: {{ product.category }}</p>
    <p>Description: {{ product.description  }}</p>

    <img class="product-img" mat-card-image [src]="product.thumbnail??'https://placehold.co/600x400'" [alt]="product.title">


  `,
  styles: [``]
})
export class DetailProductComponent {

  @Input() id = '';

  api = inject(ProductsService);
  router = inject(Router);

  product: Partial<Product> = {};

  loadProduct() {
    this.api.getProduct(Number(this.id)).subscribe(data => {
      this.product = data;
    });
  }

  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    console.log(this.id);
    if (this.id) {
      this.loadProduct();
    } else {
      this._snackBar.open('Product id not valid ! Redirecting to product list', 'Ok');
      this.router.navigate(['', 'products']);
    }
  }

}
