import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public user: any;
  public cartItems: any;

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.getUser();
    if(!localStorage.getItem("access_token")){
      this.router.navigate(['login']);
    }
  }


  getUser(){
    this.apiService.getUser(String(localStorage.getItem("username")), String(localStorage.getItem("access_token"))).subscribe((res) => {
      this.user = res;
      this.cartItems = this.user.cart.cartItems;
    },
      (error) => {if(!Boolean(error["ok"])){
        localStorage.clear();
      }
    });
  }

  removeCartItem(item: any){
    this.authService.removeFromCart(item);
    window.location.reload();
  }

  productClicked(product: any){
    this.router.navigate(['product', product.id])
  }

}
