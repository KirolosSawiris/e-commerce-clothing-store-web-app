import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService:AuthService, private apiServic: ApiService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
     })
     
     if(localStorage.getItem("access_token")){
      this.router.navigate(['home']);
    }
  }

  submit(){
    this.authService.login(String(this.form.get('username')?.value), String(this.form.get('password')?.value))
    .subscribe(() => {
      this.router.navigate(['home']);
      window.location.reload();
    });
  }

}
