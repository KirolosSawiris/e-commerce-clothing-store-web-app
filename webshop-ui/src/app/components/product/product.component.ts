import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/model/iproduct';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  
  public product: any;
  public user: any;
  
  public quantity: number = 1;

  constructor(private apiService: ApiService, private router: ActivatedRoute, private authService: AuthService){}

  ngOnInit(): void {
    const productId = this.router.snapshot.paramMap.get("productId");
    this.getProduct(productId);
    this.getUser();
  }

  async getProduct(id: any){
    this.product = await this.apiService.getProductById(id);
  }

  addToCart(product: any){
    this.authService.addToCart(product,1);
  }

  async getUser(){
    if(localStorage.getItem('username') != null){
      this.user = await this.authService.getUser();
    }
  }

  async removeFav(product: any){
    await this.authService.removeFav(product);
    this.user.favoriteProducts = this.user.favoriteProducts.filter((p: IProduct) => p.id !== product.id);

  }

   async addToFav(product: any){
      await this.authService.addToFav(product);
      this.user.favoriteProducts.push(product);
  }

  favorit(product: any){    
    if(this.user){
      for(let i = 0; i < this.user.favoriteProducts.length; i++){
        if(this.user.favoriteProducts[i].id == product.id ){
          return true;
        }
      }
    }
    return false;
  }

}
