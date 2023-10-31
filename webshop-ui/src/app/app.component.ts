import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { interval , Observable, of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { ApiService } from './services/api.service';
import { FilterService } from './services/filter.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'webshop-ui';
  public logedIn: boolean = false;
  public user: any;
  public ItemsNum: any = localStorage.getItem('cartElms');
  public searchText: any;
  public filteredOptions!: Observable<string[]>;
  public searchControl = new FormControl();
  public products: any;
  public autocomProducts: any;
  public showDropdown = false;
  public isAdmin = false


  constructor(private router: Router, private apiService: ApiService, private arouter:ActivatedRoute, private authService: AuthService, private filterService : FilterService){
    
    
  }
  async getProducts(){
    this.products = await this.apiService.getProducts();
  }
 

  //check if the token exists which means the user logged in and send a get request every half a second
  //if it faild to get once then the token expired or became invalid so it kicks the user out.
  async ngOnInit(){
    this.getProducts();
    setTimeout(() => {this.searchText = localStorage.getItem('searchText');}, 5);
    localStorage.removeItem('searchText');
    if(localStorage.getItem("access_token")){
      await this.getuser();
      this.logedIn = true;
      console.log(this.user);
      const adminRole = this.user.roles.find((role: any) => role.name == "Role_Admin");
      if(adminRole){
        this.isAdmin = true;
      }
      console.log(this.isAdmin);
      
      interval(500).subscribe(x => {this.getUserCartItemsNumber();});
    }
    else{this.logedIn= false}
  }

  //clear the localstorge will delete the token hence the get request will fail then it will logout the user.
  LogOut()
  {
    localStorage.clear();
    this.router.navigate(['login']);
    window.location.reload();
  }

  async getuser(){
    this.user= await this.authService.getUser();
  }

  //this method to get the number of cart item to show it on the nav bar.
  async getUserCartItemsNumber(){
    await this.getuser();
    if(this.user){
    var sum = 0
     for(let cartItem of this.user.cart.cartItems){
      sum = sum + 1 * cartItem.quantity;      
    }
    this.ItemsNum = sum;
    localStorage.setItem("cartElms", this.ItemsNum);
    }
  }

  filter(){
    if(this.searchText != ""){
      this.router.navigate(['home/search', this.searchText]);
      
    }
    else{
      this.router.navigate(['home']);
      localStorage.removeItem('searchText')
    }
    
  }

  async refresh(){
    let func = await this.filter();
    window.location.reload();
  }
  search(){
    this.filter();
    this.refresh();
  }
  onKeyUp(event: any): void {
    const pressedKey = event.key;
    if (pressedKey == "Enter"){
      this.search();
    }
    this.autocomProducts = this.filterService.filterBySearch(this.products, String(event.target.value));
    this.showDropdown = this.autocomProducts.length > 0;
  }
  onInputFocus() {
    this.showDropdown = true;
  }

  onInputBlur() {

    setTimeout(() => {
      this.showDropdown = false;
    }, 500);
  }

  selectOption(option: any){    
    this.searchText = option;
  }
}
