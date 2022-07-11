import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: 'product', pathMatch: 'full' },
  { path: 'product', loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule) },
  { path: 'employee', loadChildren: () => import('./components/employee/employee.module').then(m => m.EmployeeModule) },
  { path: '**', redirectTo: '/', pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }