import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/model/iUser';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  
  public user: any;
  public changePassword: boolean = false;
  public ConfirmNewPassword: any;
  public submitted = false;

  form = new FormGroup({
    password: new FormControl('',Validators.required),
    newPassword: new FormControl('',Validators.required),
    ConfirmNewPassword: new FormControl('',Validators.required),
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
    console.log("hhhhsubmit");
    
    var updatedUser!: IUser;
    this.submitted = true;
    if(this.form.invalid){
      return 
    }
    this.user.password = this.form.get('password')?.value;
    this.user.newPassword = this.form.get('newPassword')?.value;
    if(this.user.newPassword == this.form.get('ConfirmNewPassword')?.value){
      this.authService.changeUserPassword(this.user);
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
