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

  async filterProducts(minPrice: any, maxPrice: any, size: any, category: any, gender: any){
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
    if(gender){
      params = params.set('gender', gender);
    }
    const res = await this.http.get('/server/api/v1/products/filter', { params }).toPromise();
    return res;
  }

  async getCategories(){
    const res = await this.http.get('/server/api/v1/categories').toPromise();
    return res;
  }
  async getCategoriesByGender(gender: string){
    const res = await this.http.get('/server/api/v1/categories/' + gender).toPromise();
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
  async getOrder(orderId: any, username: string, token: String){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
    const res = await this.http.get("/server/api/v1/orders/"+ orderId, options).toPromise();
    return res;
  }
  async updateOrder(order: any, token: String){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+ token)
      };
    const res = await this.http.put("/server/api/v1/orders/update",order, options).toPromise();
    return res;
  }
  async filterOrders(minPayment: any, maxPayment: any, status: any, customerEmail: any, token: String){

    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer '+ token);
    let params = new HttpParams();
    if(minPayment){
      params = params.set('minPayment', minPayment);
    }
    if(maxPayment){
      params = params.set('maxPayment', maxPayment);
    }
    if(status){
      params = params.set('status', status);
    }
    if(customerEmail){
      params = params.set('customerEmail', customerEmail);
    }
    const res = await this.http.get("/server/api/v1/orders/filter",{params, headers}).toPromise();
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

  async createCategory(categoryName: any,categoryGender: any, username: string, token: String){
    const body = {name: categoryName,
                  gender: categoryGender};
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

  async ShippingCostOptions(user: any, address: string, countryCode: string, city: string, postCode:string, cartNum: any){
    const headers = new HttpHeaders({
      'Host': 'api.shipengine.com',
      'API-Key': 'TEST_hO3DVGfIlKFCJ9gxrK8feEmyGXfKddqW+1/TPwhqD6k',
      'Content-Type': 'application/json'
    });
    let options = {
      headers: headers
      };
    let body = {
      "rate_options": {
        "carrier_ids": [
          "se-5515737"
        ]
      },
      "shipment": {
        "validate_address": "no_validation",
        "ship_from": {
          "name": "The President",
          "phone": "222-333-4444",
          "company_name": "",
          "address_line1": "577 Shinn Street",
          "city_locality": "New York",
          "state_province": "NY",
          "postal_code": "10022",
          "country_code": "US",
          "address_residential_indicator": "no"
        },
        "ship_to": {
          "name": "ShipEngine Team",
          "phone": "222-333-4444",
          "company_name": "ShipEngine",
          "address_line1": address,
          "city_locality": city,
          "state_province": "",
          "postal_code": postCode,
          "country_code": countryCode,
          "address_residential_indicator": "no"
        },
        "packages": [
          {
            "package_code": "package",
            "weight": {
              "value": cartNum,
              "unit": "ounce"
            }
          }
        ]
      }
    };

    const res = await this.http.post("https://corsproxy.io/?https://api.shipengine.com/v1/rates/",body,options).toPromise();
    return res;
  }

}
