export interface WarehouseI {
  id?: number;
  branch: String;          // nombre de la sucursal
  name: string;
  code: string;            // código único por sucursal
  description?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: Date;
}