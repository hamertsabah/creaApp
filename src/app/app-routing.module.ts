import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './components/auth/auth.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CommentsComponent } from './components/product-detail/comments/comments.component';
import { DetailsComponent } from './components/product-detail/details/details.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard]},
  { path: 'product-detail', component: ProductDetailComponent, canActivate: [AuthGuard], children: [
    { path: 'details/:id', component: DetailsComponent, canActivate: [AuthGuard] },
    { path: 'comments/:id', component: CommentsComponent, canActivate: [AuthGuard] }
  ] },
  
  //{ path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: 'products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
