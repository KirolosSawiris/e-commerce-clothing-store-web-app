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

  //check if the token exist, if not then the user need to login first
  ngOnInit(): void {
    this.getUser();
    if(!localStorage.getItem("access_token")){
      this.router.navigate(['login']);
    }
  }

  //get the user from the authService then assign its cartItem to the cartItem property.
  async getUser(){
    this.user = await this.authService.getUser();
    this.cartItems = this.user.cart.cartItems;
  }

  removeCartItem(item: any){
    this.authService.removeFromCart(item);
    window.location.reload();
  }

  productClicked(product: any){
    this.router.navigate(['product', product.id])
  }

}
