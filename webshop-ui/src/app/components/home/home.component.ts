import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IProduct } from '../../model/iproduct';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  public products: IProduct[] = [];
  public user: any;
  public searchTerm: any;

  constructor(private apiService: ApiService, private authService: AuthService,private router:Router,private arouter:ActivatedRoute, private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.searchTerm = this.arouter.snapshot.paramMap.get('serchTerm')?.toLowerCase();
    console.log("ss", this.searchTerm);
    
    this.apiService.getProducts().subscribe(
      data => {
        this.products = data;
        console.log(this.searchTerm != "" && typeof this.searchTerm !== 'undefined');
        
        if(this.searchTerm != "" && typeof this.searchTerm !== 'undefined'){
          this.products = this.products.filter(product => product.title.toLowerCase().includes(String(this.searchTerm).toLowerCase()));
        }
        else{this.router.navigate(['home']);}
      }
    );
  }

  addToCart(product: any){
    this.authService.addToCart(product, 1);
  }

  viewProduct(product: any){
    this.router.navigate(['product', product.id]);
  }

}
