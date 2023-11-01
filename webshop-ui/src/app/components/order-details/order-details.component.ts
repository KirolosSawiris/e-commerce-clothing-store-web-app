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

  constructor(private router: ActivatedRoute, private authService: AuthService) { }

  async ngOnInit() {
    const orderId = this.router.snapshot.paramMap.get("orderId");
    this.order = await this.authService.getOrder(orderId);
  }
  async onSelectStatusChange() {
    await this.authService.updateOrder(this.order);
  }

}
