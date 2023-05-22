import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, tap } from 'rxjs';

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

  login(username: string, password: string) {
    return this.apiService.login(username, password).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('username', response.username);
      })
    );
  }

  getUser(){
      this.apiService.getUser(String(localStorage.getItem("username")), String(localStorage.getItem("access_token"))).subscribe((res) => {
      this.user = res;},
      (error) => {if(!Boolean(error["ok"])){
        localStorage.clear()
        window.location.reload();
      }
    });
    return this.user;
  }
  editUser(user: any){
    this.apiService.editUser(user, String(localStorage.getItem("username")), String(localStorage.getItem("access_token"))).subscribe((res) => {
      this.user = res;},
      (error) => {if(!Boolean(error["ok"])){
        window.location.reload();
      }
    });
  }
  addToCart(product: any, quantity: number){
    this.apiService.addToCart(product, quantity, String(localStorage.getItem("username")), String(localStorage.getItem("access_token"))).subscribe(() => {});
  }

  removeFromCart(item: any){
    this.apiService.removefromCart(item, String(localStorage.getItem("username")), String(localStorage.getItem("access_token"))).subscribe(() => {});
  }
}
