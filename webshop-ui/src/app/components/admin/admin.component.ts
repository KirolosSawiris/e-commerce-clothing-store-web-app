import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  public orders: any;
  public selectedStatus: any;
  public customerEmail: any;
  public minPayment: any;
  public maxPayment: any;

  constructor(private authService: AuthService, private router: Router){}
  async ngOnInit() {
    await this.getOrders();
    console.log("order",this.orders);
    
  }

  async getOrders(){
    this.orders = await this.authService.getOrders();
  }

  onSelectStatusChange(event: any) {
    if (event !== null) {
      this.selectedStatus = event;
    }
  }

  async applyFilters(){
    this.orders = await this.authService.filterOrders(this.minPayment, this.maxPayment, this.selectedStatus, this.customerEmail);
  }

  showOrderDetails(order: any){
    this.router.navigate(['order', order.id]);
  }

}
