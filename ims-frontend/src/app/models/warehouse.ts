export interface WarehouseI {
  id?: number;
  branch_id: number;          // nombre de la sucursal
  name: string;
  code: string;            // código único por sucursal
  description?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: Date;

  branch:{
    id: number;
    name: string;
    status: "ACTIVE" | "INACTIVE";
  }
}