import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  
  public product: any;
  public quantity: number = 1;

  constructor(private apiService: ApiService, private router: ActivatedRoute, private authService: AuthService){}

  ngOnInit(): void {
    const productId = this.router.snapshot.paramMap.get("productId");
    this.getProduct(productId);
  }

  async getProduct(id: any){
    this.product = await this.apiService.getProductById(id);
  }

  addToCart(product: any, quantity: number){
    this.authService.addToCart(product,quantity);
  }

}
