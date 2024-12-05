import { Component, inject, Input, input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.dtos';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-product',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, RouterLink],
  template: `
  <div class="header">
    <h1>{{ id ? "Edit " + product.title : "Add new product" }}</h1>
    <div class="button-group">
      <button mat-fab extended type="button" (click)="submitForm()" [disabled]="!form.valid" class="action-button">Save</button>
      @if(id)
        {
          <a [routerLink]="['','products',product.id]">
            <button mat-fab extended type="button"  class="action-button">Go to Detail</button>
          </a>
        }
        @else {
          <a [routerLink]="['','products']">
            <button mat-fab extended type="button"  class="action-button">Cancel</button>
          </a>
        }

    </div>
  </div>

  <div class="content">
    <form class="form" [formGroup]="form" (ngSubmit)="submitForm()">
      <mat-form-field class="full-width">
        <mat-label>Title</mat-label>
        <input matInput [formControl]="title" />
        @if(title.invalid && (title.dirty || title.touched)){
          @if(title.hasError('required')){<mat-error>Title is required</mat-error>}
          @if(title.hasError('minlength')){<mat-error>Title is not valid</mat-error>}  
        }
     
      </mat-form-field>

      <mat-form-field class="full-width">
        <mat-label>Description</mat-label>
        <textarea matInput [formControl]="description"></textarea>
        @if(description.invalid && (description.dirty || description.touched)){
          @if(description.hasError('required')){<mat-error>Description is required</mat-error>}
          @if(description.hasError('minlength')){<mat-error>Description is not valid</mat-error>}  
        }

      </mat-form-field>

      <mat-form-field class="full-width">
        <mat-label>Category</mat-label>
        <input matInput [formControl]="category" />
        @if(category.invalid && (category.dirty || category.touched)){
          @if(category.hasError('required')){<mat-error>Category is required</mat-error>}
          @if(category.hasError('minlength')){<mat-error>Category is not valid</mat-error>}  
        }

      </mat-form-field>

      <mat-form-field class="full-width">
        <mat-label>Price</mat-label>
        <input matInput [formControl]="price" />
        @if(price.invalid && (price.dirty || price.touched)){
          @if(price.hasError('required')){<mat-error >Price is required</mat-error>}
          @if(price.hasError('min')){<mat-error class="error">Price is not valid</mat-error>}  
        }

      </mat-form-field>
    </form>

    <img class="product-img" mat-card-image [src]="product.thumbnail??'https://placehold.co/600x400'" [alt]="product.title">
  </div>

    `,
  styles: [`
   .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  flex: 1;
}

.button-group {
  display: flex;
  gap: 10px;
}

.action-button {
  float: right;
}

.content {
  display: flex;
  gap: 20px;
}

.form {
  flex: 1;
  max-width: 500px;
  display: block;
}

.full-width {
  width: 100%;
}

.product-img {
  flex: 1;
  max-width: 400px;
  height: auto;
  margin: 20px;
}

.error{
  text-color:red;
}

    `]
})
export class EditProductComponent {
  @Input() id = '';

  api = inject(ProductsService);
  product: Partial<Product> = {}

  form = inject(FormBuilder).group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(5), Validators.max(99999999)]],

  });

  private _snackBar = inject(MatSnackBar);
  router = inject(Router);

  get title() { return this.form.controls.title };
  get description() { return this.form.controls.description };
  get category() { return this.form.controls.category };
  get price() { return this.form.controls.price };

  submitForm() {
    if (this.form.valid) {

      this.product = { ...this.product, ...this.form.value } as Product;

      if (this.id) {
        this.api.updateProduct(Number(this.id), this.product as Product).subscribe(result => {
          this._snackBar.open('Product updated succesfully!', 'Ok');
          this.router.navigate(['', 'products']);
        });
      } else {
        this.api.addProduct(this.product as Product).subscribe(result => {
          this._snackBar.open('Product added succesfully!', 'Ok');
          this.router.navigate(['', 'products']);
        });
      }
    }
  }

  ngOnInit(): void {
    //this.api.getProduct(Number(this.id))
    console.log(this.id);

    if (this.id) { // edit mode
      this.api.getProduct(Number(this.id)).subscribe(data => {
        this.product = data;
        this.form.patchValue({
          title: this.product.title,
          description: this.product.description,
          category: this.product.category,
          price: this.product.price
        })
      })
    }
  }
}
