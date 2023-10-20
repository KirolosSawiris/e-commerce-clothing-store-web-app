import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  async uploadProductImage(image: any){
    const formData = new FormData();
    formData.append('key', "7b138827965e7497d5aec8e8636f22a7")
    formData.append('image', image);
    const res = await this.http.post('https://api.imgbb.com/1/upload', formData).toPromise();
    return res;
  }

  async getProductById(id: any){
    const res = await this.http.get('/server/api/v1/products/' + String(id)).toPromise();
    return res;
  }

  async filterProducts(minPrice: any, maxPrice: any, size: any, category: any){
    let params = new HttpParams();
    
    if(minPrice){
      params = params.set('minPrice', minPrice);
    }
    if(maxPrice){
      params = params.set('maxPrice', maxPrice);
    }
    if(size){
      params = params.set('size', size);
    }
    if(category){
      params = params.set('category', category);
      
    }
    const res = await this.http.get('/server/api/v1/products/filter', { params }).toPromise();
    return res;
  }

  async getCategories(){
    const res = await this.http.get('/server/api/v1/categories').toPromise();
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

  async editUser(user: any, username: string, token: String){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
      const res = await this.http.put('/server/api/v1/users/' + username,user, options).toPromise();
      return res
  }

  async changeUserPassword(user: any, username: string, token: String){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
      const res = await this.http.put('/server/api/v1/users/changePassword/' + username,user, options).toPromise();
      return res;
  }

  async sendNewPassword(email: String){
    const res = await this.http.get('/server/api/v1/users/sendNewPassword/' + email).toPromise();
    return res;
  }

  //add the product with a quantity to the user cart.
  addToCart(product: any,quantity: number, username: string, token: String){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
      const body = {
        product: product,
        quantity: quantity
      }
      return this.http.put('/server/api/v1/users/addCartItem/' + username, body, options);
  }
  //remove cart item from cart
  async removefromCart(item: any, username: string, token: String){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
      const res = await this.http.put('/server/api/v1/users/removeCartItem/' + username, item, options).toPromise();
      return res
  }

  async createOrder(cart: any, username: string, token: String){
    const body = cart;
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
    const res = await this.http.post("/server/api/v1/payment/create-payment/" + username, body, options).toPromise();
    return res;
  }

  async getOrders(username: string, token: String){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
    const res = await this.http.get("/server/api/v1/orders", options).toPromise();
    return res;
  }

  async confirmOrder(paymentResponse: any, token: String){
    const body = paymentResponse;
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
    const res = await this.http.post("/server/api/v1/payment/confirm-payment", body, options).toPromise();
    return res;
  }

  addToFav(product: any, username: string, token: String){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
      const body = {
        id: product.id
      } 
      return this.http.put('/server/api/v1/users/addFavourite/' + username, body, options);
  }

  removeFav(product: any, username: string, token: String){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
      const body = {
        id: product.id
      } 
      return this.http.put('/server/api/v1/users/removeFavourite/' + username, body, options);
  }

  async createCategory(categoryName: any, username: string, token: String){
    const body = {name: categoryName};
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
    const res = await this.http.post("/server/api/v1/categories", body, options).toPromise();
    return res;
  }

  async createProduct(product: any, username: string, token: String){
    const body = product;
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
    const res = await this.http.post("/server/api/v1/products", body, options).toPromise();
    return res;
  }

  async editProduct(product: any, username: string, token: String){
    const body = product;
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
    const res = await this.http.put("/server/api/v1/products", body, options).toPromise();
    return res;
  }

  async deleteProduct(product: any, username: string, token: String){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
    const res = await this.http.delete("/server/api/v1/products/" + product.id, options).toPromise();
    return res;
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
