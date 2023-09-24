import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { count, interval } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {


  public user: any;
  public changePassword: boolean = false;
  public ConfirmNewPassword: any;
  public submitted = false;

  form = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    username: new FormControl('',Validators.required),
    password: new FormControl(),
    newPassword: new FormControl(),
    ConfirmNewPassword: new FormControl(),
    email: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    country: new FormControl('',Validators.required),
    region: new FormControl('',Validators.required),
    postcode: new FormControl('',Validators.required)
  })

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.getUser();
    if(!localStorage.getItem("access_token")){
      this.router.navigate(['login']);
    }
  }

  validate(controlname: string) : Boolean{
    return Boolean(this.submitted && this.form.get(controlname)?.errors);
  }

  async getUser(){
    this.user = await this.authService.getUser();
  }

}
