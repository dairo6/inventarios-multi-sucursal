export interface ProductI {
  id?: number;
  name: string;
  code: string;
  description?: string;
  price: number;
  unit: string;
  quantity: number;
  category_id?: number;
  supplier_id?: number;

  category?: {
    id: number;
    name: string;
    status: "ACTIVE" | "INACTIVE";
  };

  supplier?: {
    id: number;
    name: string;
    status: "ACTIVE" | "INACTIVE";
  };

  status: "ACTIVE" | "INACTIVE";
  createdAt?: Date;
  updatedAt?: Date;
}
