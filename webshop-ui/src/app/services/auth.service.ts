import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private user: any;
  private products: any;
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private apiService: ApiService, private toastr: ToastrService) {
    const token = localStorage.getItem('profanis_auth');
    this._isLoggedIn$.next(!!token);
  }

  //pass the username and the password to the apiService if it returned the token then save in the localStorge.
  login(username: string, password: string) {
    return this.apiService.login(username, password).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('username', response.username);
      }), catchError((error: HttpErrorResponse)=> {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Incorrect username or password',
          confirmButtonColor: '#212529'
        });
        console.log(error);
        
        return throwError(()=> new Error('wrong username or password'));
      })
    );
  }

  //pass the token and the user name to the apiService to make the get request if it faild then clear the storge.
  async getUser(){
    try{
      this.user= await this.apiService.getUser(String(localStorage.getItem("username")), String(localStorage.getItem("access_token")));
    }
      catch(error){
        var e: HttpErrorResponse = error as HttpErrorResponse;
        if(e.status == 406){
          Swal.fire({
            icon: 'info',
            title: 'Activate your Email',
            text: 'Please activate your email to login',
            confirmButtonColor: '#212529'
          }).then(()=> window.location.reload());
        }
        localStorage.clear()
      }      
    return this.user;
  }


  async editUser(user: any){
    try{
      this.user = await this.apiService.editUser(user, String(localStorage.getItem("username")), String(localStorage.getItem("access_token")));
        Swal.fire({
          icon:'success',
          title: 'Saved',
          text: 'Your profile has been updated successfuly',
          confirmButtonColor: '#212529'
        }).then(()=> window.location.reload());
    }catch(error) {
        Swal.fire({
          icon: 'error',
          title: 'something went wrong',
          text: 'Please try again',
          confirmButtonText: 'OK',
          confirmButtonColor: '#212529'
        }).then(()=> window.location.reload());
      }
  }

  async changeUserPassword(user: any){
    try{
      this.user = await this.apiService.changeUserPassword(user, String(localStorage.getItem("username")), String(localStorage.getItem("access_token")));
        Swal.fire({
          icon:'success',
          title: 'Saved',
          text: 'Password has been updated successfuly',
          confirmButtonColor: '#212529'
        }).then(()=> window.location.reload());
    }catch(error) {
        Swal.fire({
          icon: 'error',
          title: 'Wrong passord',
          text: 'Enter your password and try again',
          confirmButtonText: 'OK',
          confirmButtonColor: '#212529'
        }).then(()=> window.location.reload());
      }
  }
  addToCart(product: any, quantity: number){
    this.apiService.addToCart(product, quantity, String(localStorage.getItem("username")), String(localStorage.getItem("access_token"))).pipe(catchError((error: HttpErrorResponse)=> {
      if(error.status == 406){
        this.toastr.error("You cannot add more");
      }else{
      Swal.fire({
        icon: 'info',
        title: 'You are not logged in',
        text: 'Please login to add this item to your cart',
        confirmButtonColor: '#212529'
      });
    }
      return throwError(()=> new Error('wrong username or password'));
    })).subscribe(() => {this.toastr.success('Added to Cart successfully');});
  }

  addToFav(product: any){
    this.apiService.addToFav(product, String(localStorage.getItem("username")), String(localStorage.getItem("access_token"))).pipe(catchError((error: HttpErrorResponse)=> {
      if(error.message == "Http failure response for http://localhost:4200/server/api/v1/users/addFavourite/null: 403 Forbidden")
      {
        Swal.fire({
          icon: 'info',
          title: 'You are not logged in',
          text: 'Please login to save this item',
          confirmButtonColor: '#212529'
        });
      }
      else{
        this.toastr.error('Error Adding Item');
      }
      return throwError(()=> new Error('wrong username or password'));
    })).subscribe(() => {this.toastr.success('Added successfully');});
  }

  removeFav(product: any){
    this.apiService.removeFav(product, String(localStorage.getItem("username")), String(localStorage.getItem("access_token"))).pipe(catchError((error: HttpErrorResponse)=> {
      Swal.fire({
        icon: 'info',
        title: 'You are not logged in',
        text: 'Please login to add this item to your cart',
        confirmButtonColor: '#212529'
      });
      return throwError(()=> new Error('wrong username or password'));
    })).subscribe(() => {this.toastr.success('Removed successfully');});
  }

  async createOrder(cart: any){
    const res = await this.apiService.createOrder(cart, String(localStorage.getItem("username")), String(localStorage.getItem("access_token")));
    return res;
  }

  async getOrders(){
    const res = await this.apiService.getOrders(String(localStorage.getItem("username")), String(localStorage.getItem("access_token")));
    return res;
  }
  async getOrder(orderId: any){
    const res = await this.apiService.getOrder(orderId, String(localStorage.getItem("username")), String(localStorage.getItem("access_token")));
    return res;
  }

  async updateOrder(order: any){
    const res = await this.apiService.updateOrder(order, String(localStorage.getItem("access_token")));
    this.toastr.success('Status successfully updated');
    return res;
  }

  async filterOrders(minPayment: any, maxPayment: any, status: any, customerEmail: any){
    const res = await this.apiService.filterOrders(minPayment, maxPayment, status, customerEmail, String(localStorage.getItem("access_token")));
    return res;
  }

  async confirmOrder(paymentResponse: any){
    const res = await this.apiService.confirmOrder(paymentResponse, String(localStorage.getItem("access_token")));
    return res;
  }

  async removeFromCart(item: any){
    const res = await this.apiService.removefromCart(item, String(localStorage.getItem("username")), String(localStorage.getItem("access_token")));
    return res;
  }

  async createCategory(categoryName: any, categoryGender: any){
    const res = await this.apiService.createCategory(categoryName, categoryGender, String(localStorage.getItem("username")), String(localStorage.getItem("access_token")));
    return res;
  }
  async createProduct(product: any){
    let res: any;
    try{
      res = await this.apiService.createProduct(product, String(localStorage.getItem("username")), String(localStorage.getItem("access_token")));        Swal.fire({
          icon:'success',
          title: 'Product added',
          text: 'Product added successfuly',
          confirmButtonColor: '#212529'
        }).then(()=> window.location.reload());
    }catch(error) {
        Swal.fire({
          icon: 'error',
          title: 'Could not add the product',
          text: 'Make sure that you have the preveldges to add products and try again later',
          confirmButtonText: 'OK',
          confirmButtonColor: '#212529'
        }).then(()=> window.location.reload());
      }
    return res;
  }

  async editProduct(product: any){
    let res: any;
    try{
      res = await this.apiService.editProduct(product, String(localStorage.getItem("username")), String(localStorage.getItem("access_token")));        
      Swal.fire({
          icon:'success',
          title: 'Product saved',
          text: 'Product edited successfuly',
          confirmButtonColor: '#212529'
        }).then(()=> window.location.reload());
    }catch(error) {
        Swal.fire({
          icon: 'error',
          title: 'Could not edit the product',
          text: 'Make sure that you have the preveldges to edit products and try again later',
          confirmButtonText: 'OK',
          confirmButtonColor: '#212529'
        }).then(()=> window.location.reload());
      }
    return res;
  }

  async deleteProduct(product: any){
    let res: any;
    try{
      res = await this.apiService.deleteProduct(product, String(localStorage.getItem("username")), String(localStorage.getItem("access_token")));        Swal.fire({
          icon:'success',
          title: 'Product deleted',
          text: 'Product deleted successfuly',
          confirmButtonColor: '#212529'
        });
    }catch(error) {
        Swal.fire({
          icon: 'error',
          title: 'Could not delete the product',
          text: 'Cannot delete product; it is referenced in orders',
          confirmButtonText: 'OK',
          confirmButtonColor: '#212529'
        });
      }
    return res;
  }
}
