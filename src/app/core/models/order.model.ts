export interface OrderDetail {
  productId: number;
  productName: string;
  quantity: number;
  price?: number;  // เพิ่ม optional price สำหรับคำนวณยอดรวม
}

export interface Order {
  orderId: number;
  userId: number;
  createdAt: string;
  status?: 'pending' | 'completed' | 'cancelled';  // เพิ่ม status
  total?: number;  // เพิ่ม total
  totalPrice?: number;
  details: OrderDetail[];
}