import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProduct } from '../model/iproduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //set the body of the login request then send it to the api for checking.
  login(username: string, password: string) {

    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
  
      return this.http.post('/server/login', body.toString(), options);
  }

  async getProducts(){
    const res = await this.http.get<IProduct[]>('/server/api/v1/products').toPromise();
    console.log("apiproduct", res);
    return res;
  }

  async getProductById(id: any){
    const res = await this.http.get('/server/api/v1/products/' + String(id)).toPromise();
    return res;
  }

  //send a get request but first add the token to the Authorization header to authenticate.
  async getUser(username: string, token: String){

    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
      const res = await this.http.get('/server/api/v1/users/' + username, options).toPromise();      
      return res;
  }

  editUser(user: any, username: string, token: String){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
      return this.http.put('/server/api/v1/users/' + username,user, options);
  }

  //add the product with a quantity to the user cart.
  addToCart(product: any,quantity: number, username: string, token: String){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
      const body = {
        product: {id: product.id,
                  price: product.price},
        quantity: quantity
      } 
      return this.http.put('/server/api/v1/users/addCartItem/' + username, body, options);
  }
  //remove cart item from cart
  removefromCart(item: any, username: string, token: String){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
      return this.http.put('/server/api/v1/users/removeCartItem/' + username, item, options);
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
