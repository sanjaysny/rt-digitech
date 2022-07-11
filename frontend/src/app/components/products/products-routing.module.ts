import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: '', component: ProductsComponent, children: [
      { path: 'list', component: ProductListComponent },
      { path: 'list/:view', component: ProductListComponent },
      { path: 'add-edit', component: AddProductComponent },
      { path: 'add-edit/:id', component: AddProductComponent },
      { path: '', redirectTo: "list", pathMatch: "full" },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }