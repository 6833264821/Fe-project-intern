export interface OrderDetail {
  productId: number;
  productName: string;
  quantity: number;
}

export interface Order {
  orderId: number;
  userId: number;
  createdAt: string;
  totalPrice: number;
  details: OrderDetail[];
}
