import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  public order: any;
  public user: any;
  public isAdmin: boolean = false;

  constructor(private router: ActivatedRoute, private authService: AuthService) { }

  async ngOnInit() {
    this.user = await this.authService.getUser();
    const adminRole = this.user.roles.find((role: any) => role.name == "Role_Admin");
      if(adminRole){
        this.isAdmin = true;
      }
    const orderId = this.router.snapshot.paramMap.get("orderId");
    if(this.isAdmin){
      this.order = await this.authService.getOrder(orderId);
    }else{
      this.order = this.user.orders.find((role: any) => role.id == orderId);
    }
    
  }
  async onSelectStatusChange() {
    await this.authService.updateOrder(this.order);
  }

}
