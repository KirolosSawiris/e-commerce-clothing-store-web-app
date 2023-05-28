import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  submitted = false;
  form = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    country: new FormControl('',Validators.required),
    region: new FormControl('',Validators.required),
    postcode: new FormControl('',Validators.required)
  })

  constructor(private router: Router, private apiService: ApiService){
  }

  ngOnInit(): void {
    if(localStorage.getItem("access_token")){
      this.router.navigate(['home']);
    }
  }
  validate(controlname: string) : Boolean{
    return Boolean(this.submitted && this.form.get(controlname)?.errors);
  }

  //submit to create new user
  submit(){
    this.submitted = true;
    if(this.form.invalid){
      return
    }
    var firstName = this.form.get('firstName')?.value;
    var lastName = this.form.get('lastName')?.value;
    var username = this.form.get('username')?.value;
    var email = this.form.get('email')?.value;
    var password = this.form.get('password')?.value;
    var address = this.form.get('address')?.value;
    var postcode = this.form.get('postcode')?.value;
    var region = this.form.get('region')?.value;
    var country = this.form.get('country')?.value;
    console.log(firstName, lastName, username, email, password, address, postcode, region, country);
    //creat the user by passing the vars to the apiService function.
    this.apiService.createUser(firstName, lastName, username, email, password, address, postcode, country,region).pipe(catchError((error: Error)=> {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'This username or email has been used before!',
        confirmButtonColor: '#212529'
      });
      return throwError(()=> new Error('Cannot create this user'));
    })).subscribe(()=> {
      Swal.fire({
        icon: 'success',
        title: 'Registered',
        text: 'You Registered successfully, now you can login',
        confirmButtonColor: '#212529'
      }).then(()=>this.router.navigate(['login']));
    });
    
  }

}
