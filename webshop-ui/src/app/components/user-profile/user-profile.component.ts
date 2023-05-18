import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { count, interval } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  public username: string = '';
  public token: string = '';
  public user: any;
  public logedIn: string = '';

  form = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
    address: new FormControl(),
    country: new FormControl(),
    region: new FormControl(),
    postcode: new FormControl()
  })

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.getUser();
    if(!localStorage.getItem("access_token")){
      this.router.navigate(['login']);
    }
  }


  getUser(){
    this.apiService.getUser(String(localStorage.getItem("username")), String(localStorage.getItem("access_token"))).subscribe((res) => {
      this.user = res;},
      (error) => {if(!Boolean(error["ok"])){
        localStorage.clear();
      }
    });
  }

  submit(){
    this.authService.editUser(this.user);
    window.location.reload();
  }

}
