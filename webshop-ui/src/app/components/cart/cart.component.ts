import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

declare var Razorpay: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public user: any;
  public cartItems: any;
  public res: any;

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

  async removeCartItem(item: any){
    const func = await this.authService.removeFromCart(item);
    window.location.reload();
  }

  productClicked(product: any){
    this.router.navigate(['product', product.id])
  }

  async createOrder(amount: any){
    this.res = await this.apiService.createOrder(amount);
    this.openTransactioModal(this.res);
    
  }

  openTransactioModal (response: any) {
    var options= {
    order_id: response.orderId,
    key: "rzp_test_49qbWP5JOTtLzy",
    amount: response. amount,
    currency: response. currency,
    name: 'Web Shop',
    description: 'Pay for your order',
    image: 'https://i.ibb.co/G3PrPHS/favicon.png',
    handler: (response: any) => {
    this.processResponse (response);
    },
    prefill : {
    name: this.user.username,
    email: this.user.email,
    contact: '+36'
    },
    theme: {
      color: "#101010"
    }
  };

  var razorpayObject = new Razorpay(options);
  razorpayObject.open();

}
    processResponse(resp: any) {
    console.log (resp);
    }

  

}
