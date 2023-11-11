import { Category } from "./iUser";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  description: string;
  image: string;
  category: Category
}

