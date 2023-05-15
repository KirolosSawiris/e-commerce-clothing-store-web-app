import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IProduct } from '../../model/iproduct';
import { Router } from '@angular/router';
import { interval } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
String(arg0: any): string {
throw new Error('Method not implemented.');
}
Number(arg0: any): number {
throw new Error('Method not implemented.');
}

  public products: IProduct[] = [];
  public username: string = '';
  public token: string = '';
  public user: any;
  public logedIn: string = '';
  public sub: any;
  

  constructor(private apiService: ApiService,private router:Router, private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.getProducts();
    interval(5000).subscribe(x => {this.getUser();});
    this.username = String(localStorage.getItem("username"));
    this.token = String(localStorage.getItem("access_token"));
    this.logedIn = String(localStorage.getItem("logedIn"));
  }

  getProducts(){
    this.apiService.getProducts().subscribe(
      data => {
        this.products = data;
      }
    );
  }
  getUser(){
    this.username = String(localStorage.getItem("username"));
    this.token = String(localStorage.getItem("access_token"));
    this.apiService.getUser(this.username, this.token).subscribe((res) => {
      this.user = res;},
      (error) => {if(Boolean(error["ok"])){
        localStorage.setItem("logedIn", "true")
        this.router.navigate(['home']);
        window.location.reload();
      }
      else{
        localStorage.setItem("logedIn", "false");
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
      }
    });
  }

  
}
