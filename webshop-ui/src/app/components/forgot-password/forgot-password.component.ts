import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  form = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  constructor(private apiServic: ApiService, private router: Router, private formBuilder: FormBuilder) {}


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ''
     })
     //if the token exist that means the user already signed in, so redirect it to home.
     if(localStorage.getItem("access_token")){
      this.router.navigate(['home']);
    }
  }

  async submit(){
    await this.apiServic.sendNewPassword(String(this.form.get('email')?.value));
    Swal.fire({
      icon:'success',
      title: 'New Password sent',
      text: 'A new password has been sent to your email',
      confirmButtonColor: '#212529'
    }).then(()=> window.location.reload());
  }

}
