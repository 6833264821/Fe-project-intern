export interface Item {
  id: number;
  name: string;
  description: string;
  category?: string;
  store?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  isActive: boolean;
}
