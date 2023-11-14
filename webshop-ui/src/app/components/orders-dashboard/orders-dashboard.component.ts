import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrls: ['./orders-dashboard.component.css']
})
export class OrdersDashboardComponent implements OnInit {

  public orders: any;
  public user: any;
  public selectedStatus: any;
  public customerEmail: any;
  public minPayment: any;
  public maxPayment: any;
  public username:any;

  constructor(private authService: AuthService, private router: Router, private arouter: ActivatedRoute){}
  async ngOnInit() {
    this.user = await this.authService.getUser();
    this.username = this.arouter.snapshot.paramMap.get("username");
    if(this.username){
      this.orders = this.user.orders;
    }
    else{
      this.orders = await this.authService.getOrders();
    }
    
    console.log("order",this.orders);
    
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
