import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webshop-ui';
  public logedIn = String(localStorage.getItem("logedIn"));
  public isUser: boolean = false;
  constructor(private router: Router){}
  ngOnInit(){
    this.logedIn = String(localStorage.getItem("logedIn"));
    if(this.logedIn == "true"){
      this.isUser = true;
    }
  }
}
