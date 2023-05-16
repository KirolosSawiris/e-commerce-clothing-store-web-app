import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IProduct } from '../../model/iproduct';
import { Router } from '@angular/router';
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

  constructor(private apiService: ApiService, private authService: AuthService,private router:Router, private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.apiService.getProducts().subscribe(
      data => {
        this.products = data;
      }
    );
  }

  
}
