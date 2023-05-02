import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  public customers: any;

  constructor(private customerService: CustomerService){}

  ngOnInit() {}

  getCustomer(token: string){
    this.customerService.getCustomers(token).subscribe(
      data => {this.customers = data}
    );
  }

}
