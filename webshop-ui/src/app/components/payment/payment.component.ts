import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
//import * as Razorpay from 'razorpay';
import { ApiService } from 'src/app/services/api.service';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  public res: any;
  stripePromise = loadStripe("pk_test_51Nw2StEPlxO1GGVxS2QoEKHJdYteDt1XAvnnIhkz0mtoWJFbWEH4T4bNtzjGkoUWVj8JXQ1NxEPyDyct0QatD6hr00MbBkNAEk");
  constructor(private apiService : ApiService) {}
   ngOnInit() {
    


  }

  

}
