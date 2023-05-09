import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { LoginComponent } from '../login/login.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  public products: any;

  constructor(private apiService: ApiService){}
  ngOnInit(): void {this.getProducts()}

  getProducts(){
    this.apiService.getProducts().subscribe(
      data => {this.products = data}
    );
  }

}
