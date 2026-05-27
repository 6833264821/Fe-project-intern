export interface Item {
  id: number;
  name: string;
  description: string;
  category?: string;
  store?: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  isActive: boolean;
}
