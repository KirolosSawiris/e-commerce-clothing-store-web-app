import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent {

  public products: any;
 

  constructor(private authService: AuthService, private router:Router){}

   ngOnInit() {
    this.getFavProducts();
  }

   async getFavProducts(){
     if(localStorage.getItem('username') != null){
        const user = await this.authService.getUser();
        this.products = await user.favoriteProducts;
     }
   }

  addToCart(product: any){
    this.authService.addToCart(product, 1);
  }

   removeFav(product: any){
    this.authService.removeFav(product);
    this.products = this.products.filter((p: any) => p.id !== product.id);
 
  }

  viewProduct(product: any){
    this.router.navigate(['product', product.id]);
  }
}
