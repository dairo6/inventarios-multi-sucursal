export interface ProductI {
  id?: number;
  name: string;
  code: string;            // código único interno
  description?: string;
  price: number;
  unit: string;            // unidad de medida (kg, unidad, caja)
  category?: string;
  supplier?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: Date;
  updatedAt?: Date;
}