import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { SavedComponent } from './components/saved/saved.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'Register',
    component: RegistrationComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'product/:productId',
    component: ProductComponent
  },
  {
    path: 'order/:orderId',
    component: OrderDetailsComponent
  },
  {
    path: 'editProduct/:productId',
    component: EditProductComponent
  },
  {
    path: 'home/search/:serchTerm',
    component: HomeComponent
  },
  {
    path: 'saved',
    component: SavedComponent
  },
  {
    path: 'editProfile',
    component: EditProfileComponent
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent
  },
  {
    path: 'addProduct',
    component: AddProductComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent
  },
  {
    path: '**', redirectTo: 'home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
