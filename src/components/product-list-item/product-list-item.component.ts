import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { Product } from '../../models/products.dtos';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  template: `
      <mat-card class="example-card" appearance="outlined">
      <mat-card-header>
        <!-- <div mat-card-avatar class="example-header-image"></div> -->
        <mat-card-title>{{product.title}}</mat-card-title>
        <mat-card-subtitle>{{product.category}} | {{product.brand}} </mat-card-subtitle>
      </mat-card-header>
      <img class="product-card-img" mat-card-image [src]="product.thumbnail" [alt]="product.title">
      <mat-card-content>
        <p>
        {{product.description}}
        </p>
      </mat-card-content>
      <mat-card-actions>
      <button mat-button [routerLink]="['', 'products', product.id, 'edit']">Edit</button>
      <button mat-button [routerLink]="['', 'products', product.id]">Show Details</button>
      <button mat-button (click)="deleteProduct(product.id)">Delete</button>
      </mat-card-actions>
    </mat-card>

  `,
  styles: [`
  .example-card {
    max-width: 350px;
    padding: 20px;
    display:inline-block;
    margin: 10px;
  }

  .product-card-img{
    max-width:430px;
    margin:0 auto;
  }

  `]
})
export class ProductListItemComponent {
  @Input() product!: Product;
  @Input() deleteProductParent!: (id: number) => void;

  deleteProduct(id: number) {
    if (this.deleteProductParent) {
      this.deleteProductParent(id);
    }
  }
}
