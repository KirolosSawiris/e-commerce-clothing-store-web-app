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
  public res: any;

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) { }

  //check if the token exist, if not then the user need to login first
  async ngOnInit() {
    await this.getUser();
    if (!localStorage.getItem("access_token")) {
      this.router.navigate(['login']);
    }
  }

  //get the user from the authService then assign its cartItem to the cartItem property.
  async getUser() {
    this.user = await this.authService.getUser();
  }

  async removeCartItem(item: any) {
    const func = await this.authService.removeFromCart(item);
    this.user.cart.cartItems = this.user.cart.cartItems.filter((i: any) => i.id !== item.id);
    this.user.cart.cartTotal = this.user.cart.cartTotal - item.product.price * item.quantity;
  }

  productClicked(product: any) {
    this.router.navigate(['product', product.id])
  }

  async createOrder(cart: any) {
    this.res = await this.authService.createOrder(cart);
    this.openTransactioModal(this.res);

  }

  openTransactioModal(response: any) {
    var options = {
      order_id: response.razorpayOrderId,
      key: "rzp_test_49qbWP5JOTtLzy",
      amount: response.amount,
      currency: "USD",
      name: 'Web Shop',
      description: 'Pay for your order',
      image: 'https://i.ibb.co/G3PrPHS/favicon.png',
      handler: (response: any) => {
        this.processResponse(response);
      },
      prefill: {
        name: this.user.lastName + " " + this.user.firstName,
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
  async processResponse(resp: any) {
    console.log(resp);
    const confirmRes = await this.authService.confirmOrder(resp);
    if (confirmRes) {

      for (let cartItem of this.user.cart.cartItems) {
        await this.removeCartItem(cartItem);
      }
    }
  }

  async decreaseQuantity(cartItem: any){
    let oneQuantityItem = JSON.parse(JSON.stringify(cartItem));
    oneQuantityItem.quantity = 1;
    console.log(oneQuantityItem);
    console.log(cartItem);
    await this.authService.removeFromCart(oneQuantityItem);
    cartItem.quantity = cartItem.quantity - 1;
    if(cartItem.quantity == 0){
      this.user.cart.cartItems = this.user.cart.cartItems.filter((i: any) => i.id !== cartItem.id);
    }
    this.user.cart.cartTotal = this.user.cart.cartTotal - cartItem.product.price;
  }
  async increaseQuantity(cartItem: any){
    await this.authService.addToCart(cartItem.product, 1);
    cartItem.quantity = cartItem.quantity + 1;
    this.user.cart.cartTotal = this.user.cart.cartTotal + cartItem.product.price;
  }
}
