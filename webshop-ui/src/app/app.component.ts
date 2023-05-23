import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { interval } from 'rxjs';

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
  public filterTerm: string = "";

  constructor(private router: Router, private authService: AuthService){}

  //check if the token exists which means the user logged in and send a get request every half a second
  //if it faild to get once then the token expired or became invalid so it kicks the user out.
  ngOnInit(){
    if(localStorage.getItem("access_token")){
      this.logedIn = true;
      interval(500).subscribe(x => {this.getUserCartItemsNumber();});
    }
    else{this.logedIn= false}
  }

  //clear the localstorge will delete the token hence the get request will fail then it will logout the user.
  LogOut()
  {
    localStorage.clear();
    this.router.navigate(['home']);
    window.location.reload();
  }

  //this method to get the number of cart item to show it on the nav bar.
  async getUserCartItemsNumber(){
    this.user= await this.authService.getUser();
    if(this.user){
    this.ItemsNum = this.user['cart']['cartItems']['length'];
    localStorage.setItem("cartElms", this.user['cart']['cartItems']['length']);
    }
  }

  filter(){
    if(this.filterTerm != ""){this.router.navigate(['home/search',this.filterTerm]);}
    else{this.router.navigate(['home']);}
  }

  async refresh(){
    let func = await this.filter();
    window.location.reload();
  }
  search(){
    this.filter();
    this.refresh();
  }
}
