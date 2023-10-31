import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  public shippingOptions:any;
  public address: any;
  public countryCode: any;
  public city: any;
  public postCode: any;
  public selectedOption: any = null;
  public shipping = 0.00;
  public total = 0;
  public packageWeghit = 0;
//   public shippingOptions = [{
//     "shipping_amount": 253.52,
//     "delivery_days": 1,
//     "estimated_delivery_date": "2023-10-31T12:00:00Z",
//     "carrier_delivery_days": "Tomorrow by 12:00 PM",
//     "service_type": "UPS Worldwide Express®"
// },
// {
//     "shipping_amount": 253.52,
//     "delivery_days": 1,
//     "estimated_delivery_date": "2023-10-31T12:00:00Z",
//     "carrier_delivery_days": "Tomorrow by 12:00 PM",
//     "service_type": "UPS Worldwide Express®"
// },
// {
//     "shipping_amount": 253.52,
//     "delivery_days": 1,
//     "estimated_delivery_date": "2023-10-31T12:00:00Z",
//     "carrier_delivery_days": "Tomorrow by 12:00 PM",
//     "service_type": "UPS Worldwide Express®"
// }];

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService, private toastr: ToastrService) { }

  //check if the token exist, if not then the user need to login first
  async ngOnInit() {
    await this.getUser();
    this.total = this.user.cart.cartTotal;
    this.address = this.user.address;
    this.countryCode = this.user.country;
    this.city= this.user.region;
    this.postCode= this.user.postcode;
    
    if (!localStorage.getItem("access_token")) {
      this.router.navigate(['login']);
    }
  }

  //get the user from the authService then assign its cartItem to the cartItem property.
  async getUser() {
    this.user = await this.authService.getUser();
  }

  async removeCartItem(item: any) {
    this.selectedOption = null;
    this.shippingOptions = null;
    this.shipping = 0;
    const func = await this.authService.removeFromCart(item);
    this.user.cart.cartItems = this.user.cart.cartItems.filter((i: any) => i.id !== item.id);
    this.user.cart.cartTotal = this.user.cart.cartTotal - item.product.price * item.quantity
    this.total = this.shipping + this.user.cart.cartTotal;
  }

  productClicked(product: any) {
    this.router.navigate(['product', product.id])
  }

  async createOrder() {
    this.selectedOption.estimated_delivery_date= this.selectedOption.estimated_delivery_date.slice(0, -1) + '+01:00';
    var order = {
      amount: this.total.toFixed(2),
      customerEmail: this.user.email,
      shippingAddress: this.address,
      shippingCountry: this.countryCode,
      shippingRegion: this.city,
      shippingPostcode: this.postCode,
      expectedAt: this.selectedOption.estimated_delivery_date
    }
    this.res = await this.authService.createOrder(order);
    this.openTransactioModal(this.res);

  }

  openTransactioModal(response: any) {
    var options = {
      order_id: response.razorpayOrderId,
      key: "rzp_test_49qbWP5JOTtLzy",
      amount: this.total*100,
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
    this.selectedOption = null;
    this.shippingOptions = null;
    this.shipping = 0;
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
    this.total = this.shipping + this.user.cart.cartTotal;
  }
  async increaseQuantity(cartItem: any){
    this.selectedOption = null;
    this.shippingOptions = null;
    this.shipping = 0;
    if(cartItem.product.quantity >= cartItem.quantity + 1){
      await this.authService.addToCart(cartItem.product, 1);
      cartItem.quantity = cartItem.quantity + 1;
      this.user.cart.cartTotal = this.user.cart.cartTotal + cartItem.product.price;
      this.total = this.shipping + this.user.cart.cartTotal;
    }else{
      this.toastr.error('You cannot add more');
    }
  }
  async changeOptions(){
    this.packageWeghit = Number(localStorage.getItem("cartElms"))*5;
    this.shippingOptions= await this.apiService.ShippingCostOptions(this.user, this.address, this.countryCode, this.city, this.postCode,this.packageWeghit);
    this.shippingOptions = this.shippingOptions.rate_response.rates;
    this.shippingOptions.sort((b: any, a: any) => new Date(b.estimated_delivery_date).getTime() - new Date(a.estimated_delivery_date).getTime());

    console.log(this.shippingOptions);
    
  }
  chooseOption(option: any){
    this.selectedOption = option;
    this.shipping = option.shipping_amount.amount;
    this.total = this.user.cart.cartTotal + this.shipping
  }

}
