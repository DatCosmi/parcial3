export interface Product {
  _id: any;
  id: string;
  code: string;
  name: string;
  category: string;
  description: string;
  price: number;
  amount: number;
  status: boolean;
  creationDate: Date;
  deleteDate: Date;
}
