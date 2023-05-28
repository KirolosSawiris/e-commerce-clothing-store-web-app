import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Title } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private user: any;
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private apiService: ApiService) {
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
        localStorage.clear()
        window.location.reload();
      }      
    return this.user;
  }
  editUser(user: any){
    this.apiService.editUser(user, String(localStorage.getItem("username")), String(localStorage.getItem("access_token"))).subscribe((res) => {
      Swal.fire({
        icon:'success',
        title: 'Saved',
        text: 'Your profile has been updated successfuly',
        confirmButtonColor: '#212529'
      }).then(()=> window.location.reload());
      this.user = res;},
      (error) => {if(!Boolean(error["ok"])){
        Swal.fire({
          icon: 'error',
          title: 'Wrong passord',
          text: 'Enter your password and try again',
          confirmButtonText: 'OK',
          confirmButtonColor: '#212529'
        }).then(()=> window.location.reload())
      }
    });
  }
  addToCart(product: any, quantity: number){
    this.apiService.addToCart(product, quantity, String(localStorage.getItem("username")), String(localStorage.getItem("access_token"))).pipe(catchError((error: HttpErrorResponse)=> {
      Swal.fire({
        icon: 'info',
        title: 'You are not logged in',
        text: 'Please login to add this item to your cart',
        confirmButtonColor: '#212529'
      });
      return throwError(()=> new Error('wrong username or password'));
    })).subscribe(() => {});
  }

  removeFromCart(item: any){
    this.apiService.removefromCart(item, String(localStorage.getItem("username")), String(localStorage.getItem("access_token"))).subscribe(() => {});
  }
}
