import { IProduct } from "./iproduct";

export interface OrderItem {
    id: number;
    product: IProduct;
    quantity: number;
  }
  
  export interface Shipment {
    id: number;
    rate_id: string;
    shipping_amount: number | null;
    amount: number;
    delivery_days: number;
    estimated_delivery_date: string;
    carrier_delivery_days: string;
    ship_date: string;
    service_type: string;
    shipping_address: string;
    shipping_country: string;
    shipping_region: string;
    shipping_postcode: string;
  }
  
  export interface Iorder {
    id: number;
    status: string;
    customerEmail: string;
    razorpayOrderId: string;
    razorpayTransactionId: string;
    razorpaySignature: string;
    amount: number;
    createdAt: string;
    orderItems: OrderItem[];
    shipment: Shipment;
  }