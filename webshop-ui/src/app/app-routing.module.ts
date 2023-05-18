import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent
  },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
