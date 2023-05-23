import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IProduct } from '../../model/iproduct';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FilterService } from 'src/app/services/filter.service';


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

  constructor(private filterService: FilterService, private apiService: ApiService, private authService: AuthService,private router:Router,private arouter:ActivatedRoute, private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.searchTerm = this.arouter.snapshot.paramMap.get('serchTerm')?.toLowerCase() || "";
    this.getProducts();
  }

  //get the products then apply the filter service to filter if the user used the search bar.
  async getProducts(){
    this.products = await this.apiService.getProducts() as IProduct[];    
    this.products = this.filterService.filterBySearch(this.products,this.searchTerm)    
  }

  addToCart(product: any){
    this.authService.addToCart(product, 1);
  }

  viewProduct(product: any){
    this.router.navigate(['product', product.id]);
  }

}
