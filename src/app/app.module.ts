import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './components/auth/auth.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommentsComponent } from './components/product-detail/comments/comments.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DetailsComponent } from './components/product-detail/details/details.component';

import { registerLocaleData, DatePipe } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { AuthInterceptor } from './services/auth.interceptor';
import { ErrorInterceptor } from './services/error.interceptor';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavbarComponent,
    ProductsComponent,
    ProductDetailComponent,
    CommentsComponent,
    SidebarComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de_DE'},
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    //fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
