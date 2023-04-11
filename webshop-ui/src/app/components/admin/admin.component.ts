import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  public customers: any;

  constructor(private customerService: CustomerService){}

  ngOnInit() {this.getCustomer()}

  getCustomer(){
    this.customerService.getCustomers().subscribe(
      data => {this.customers = data}
    );
  }

}
