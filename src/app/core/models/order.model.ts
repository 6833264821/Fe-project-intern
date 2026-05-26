export interface OrderItem {
  itemId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
}
