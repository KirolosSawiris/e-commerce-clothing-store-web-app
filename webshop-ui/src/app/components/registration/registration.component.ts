import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

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

  constructor(private router: Router, private apiService: ApiService){
  }

  ngOnInit(): void {
    if(localStorage.getItem("access_token")){
      this.router.navigate(['home']);
    }
  }


  //submit to create new user
  submit(){
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
    this.apiService.createUser(firstName, lastName, username, email, password, address, postcode, country,region).subscribe(data=> {this.user = data;});
    this.router.navigate(['login']);
  }

}
