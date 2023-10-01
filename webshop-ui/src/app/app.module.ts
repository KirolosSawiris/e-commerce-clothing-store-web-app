import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from'@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatInputModule} from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatListModule} from '@angular/material/list';
import {ToastrModule} from 'ngx-toastr';
import { SavedComponent } from './components/saved/saved.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { PaymentComponent } from './components/payment/payment.component'
import { NgxStripeModule } from 'ngx-stripe';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    HomeComponent,
    UserProfileComponent,
    RegistrationComponent,
    CartComponent,
    ProductComponent,
    SavedComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    AddProductComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatListModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    }),
    NgxStripeModule.forRoot("pk_test_51Nw2StEPlxO1GGVxS2QoEKHJdYteDt1XAvnnIhkz0mtoWJFbWEH4T4bNtzjGkoUWVj8JXQ1NxEPyDyct0QatD6hr00MbBkNAEk"),
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
