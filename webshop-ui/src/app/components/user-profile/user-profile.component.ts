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

  //submit and edit the user and then wait half a second and refresh to make sure that the changes has been saved in the database.
  submit(){
    this.submitted = true;
    if(this.form.invalid){
      return 
    }
    if(this.user.newPassword == this.form.get('ConfirmNewPassword')?.value){
      this.authService.editUser(this.user);
    }
    else{      
      Swal.fire({
        icon:'error',
        title: 'Passwords does not match',
        text: 'Make sure confirm new password and the new password are the same!',
        confirmButtonColor: '#212529'
      }).then(()=> window.location.reload())
    }
  }

}
