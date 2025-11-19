export interface LocationI {
  id?: number;
  warehouse_id: number; // almacén
  code: string;            
  description?: string;
  status: "AVAILABLE" | "OCCUPIED" | "BLOCKED";


  warehouse: {
    id: number;
    name: string;
    status: "ACTIVE" | "INACTIVE";  
  }
}