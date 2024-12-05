import { Routes } from '@angular/router';
import { ProductsComponent } from '../components/products/products.component';
import { EditProductComponent } from '../components/edit-product/edit-product.component';
import { DetailProductComponent } from '../components/detail-product/detail-product.component';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', component: ProductsComponent },
    { path: 'products/new', component: EditProductComponent },
    { path: 'products/:id/edit', component: EditProductComponent },
    { path: 'products/:id', component: DetailProductComponent },

];
