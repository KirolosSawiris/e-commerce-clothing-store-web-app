import { IProduct } from "./iproduct";
export interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: null | string;
  address: string;
  country: string;
  region: string;
  postcode: string;
  newPassword: null | string;
  roles: Role[];
  orders: any[]; // Define the structure for orders if needed
  cart: Cart;
  favoriteProducts: IProduct[];
}

export interface Role {
  id: number;
  name: string;
}

export interface Cart {
  id: number;
  cartTotal: number;
  cartItems: any[]; // Define the structure for cart items if needed
}


export interface Category {
  id: number;
  name: string;
  gender: string;
}





