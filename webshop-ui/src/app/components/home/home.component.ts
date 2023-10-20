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
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  public products: IProduct[] = [];
  public user: any;
  public colors: any;
  public categories: any;
  //this searchTerm will store the word that the user wants to search about when he user the search bar.
  public searchTerm: string = "";
  public isFav: boolean = false;
  public isAdmin: boolean =  false;

  public minPrice :any;
  public maxPrice : any;
  public selectedSize : any;
  public selectedCategory: any;


  constructor(private filterService: FilterService, private apiService: ApiService, private authService: AuthService,private router:Router,private arouter:ActivatedRoute){}

  async ngOnInit() {
    this.searchTerm = this.arouter.snapshot.paramMap.get('serchTerm')?.toLowerCase() || "";
    localStorage.setItem('searchText', this.searchTerm);
    await this.getUser();
    if(this.user){
      const adminRole = this.user.roles.find((role: any) => role.name == "Role_Admin");
      if(adminRole){
        this.isAdmin = true;
      }
    }
    await this.getProducts();
    await this.getCategories();
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
    await this.authService.removeFav(product);
    this.user.favoriteProducts = this.user.favoriteProducts.filter((p: IProduct) => p.id !== product.id);

  }

   async addToFav(product: any){
      await this.authService.addToFav(product);
      this.user.favoriteProducts.push(product);
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

  async getCategories(){
    this.categories = await this.apiService.getCategories();
    this.categories.sort();
  }

   
  async applyFilters(){
    this.products = await this.apiService.filterProducts(this.minPrice, this.maxPrice, this.selectedSize, this.selectedCategory) as IProduct[];
  }

  onSelectSizeChange(event: any) {
    if (event !== null) {
      this.selectedSize = event;
      console.log(this.selectedSize);
    }
  }


  onSelectCategoryChange(event: any) {
    if (event !== null) {
      this.selectedCategory = event;
      console.log(this.selectedCategory);
    }
  }

  edit(product: any){
    this.router.navigate(['editProduct', product.id]);
  }
  delete(product: any){
    Swal.fire({
      title: 'Do you want to delete this product?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: "#D10000",
      denyButtonText: 'No',
      denyButtonColor: '#212529',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteProduct(product);
        this.products = this.products.filter((p: any) => p.id !== product.id);
      }
    })
  }

}
