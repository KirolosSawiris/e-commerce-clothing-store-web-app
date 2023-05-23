import { Injectable } from '@angular/core';
import { IProduct } from '../model/iproduct';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public searchTerm: string = "";
  public products: IProduct[] = [];

  constructor(private router: Router) { }

  //take the list of products and searchTerm and apply the filter
  public filterBySearch(products: IProduct[], searchTerm: string){
    if(searchTerm != "" && typeof searchTerm !== 'undefined'){
      this.products = products.filter(product => product.title.toLowerCase().includes(String(searchTerm).toLowerCase()));      
    }
    else{
      this.products = products;
    }
    return this.products;
  }
}
