import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  public orders: any;

  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.getProducts();
    console.log(this.orders);
    
  }

  async getProducts(){
    this.orders = await this.authService.getOrder();
  }

}
