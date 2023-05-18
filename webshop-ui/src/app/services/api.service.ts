import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProduct } from '../model/iproduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {

    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
  
      return this.http.post('/server/login', body.toString(), options);
  }

  getProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>('/server/api/v1/products');
  }

  getProductImage(id: any){
    return this.http.get('/server/api/v1/products/download/' + String(id), {responseType: 'blob'})
  }

  getUser(username: string, token: String){

    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
      return this.http.get('/server/api/v1/users/' + username, options);
  }

  editUser(user: any, username: string, token: String){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
      return this.http.put('/server/api/v1/users/' + username,user, options);
  }
  createUser(firstName: any, lastName: any, username: any, email:any, password: any, address: any, postcode: any, country: any, region: any){
    const user = { 
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
      address: address,
      postcode: postcode,
      country: country,
      region: region
    };
      return this.http.post('/server/api/v1/users/Register', user);
  }
}
