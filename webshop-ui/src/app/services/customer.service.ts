import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {



  constructor(private http:HttpClient) { }

  

  getCustomers(token: string){

    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
      };
    return this.http.get('/server/api/v1/customers');
  }
}
