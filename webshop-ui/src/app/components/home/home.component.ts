import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IProduct } from '../../model/iproduct';
import {IUser} from '../../model/iUser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FilterService } from 'src/app/services/filter.service';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  public products: IProduct[] = [];
  public user: any;
  //this searchTerm will store the word that the user wants to search about when he user the search bar.
  public searchTerm: string = "";
  public isFav: boolean = false;

  constructor(private filterService: FilterService, private apiService: ApiService, private authService: AuthService,private router:Router,private arouter:ActivatedRoute){}

  async ngOnInit() {
    this.searchTerm = this.arouter.snapshot.paramMap.get('serchTerm')?.toLowerCase() || "";
    localStorage.setItem('searchText', this.searchTerm);
    await this.getUser();
    this.getProducts();
    console.log("home u", this.user);
  }

  async getUser(){
    if(localStorage.getItem('username') != null){
      this.user = await this.authService.getUser();
    }
  }

  //get the products then apply the filter service to filter if the user used the search bar.
  async getProducts(){
    this.products = await this.apiService.getProducts() as IProduct[];    
    this.products = this.filterService.filterBySearch(this.products,this.searchTerm)    
  }


  addToCart(product: any){
    this.authService.addToCart(product, 1);
  }

   async removeFav(product: any){
    this.authService.removeFav(product);
    await this.getUser();
    await this.getUser();
  }

   async addToFav(product: any){
      this.authService.addToFav(product);
      await this.getUser();
      await this.getUser();
  }


  viewProduct(product: any){
    this.router.navigate(['product', product.id]);
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
