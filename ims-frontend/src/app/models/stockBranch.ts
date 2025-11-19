export interface StockBranchI {
  id?: number;
  branch_id: number;
  product_id: number;
  quantity: number;
  minStock: number;
  maxStock: number;
  status?: "ACTIVE" | "INACTIVE";
  updatedAt?: Date;


  branch:{ 
    id: number;
    name: string;
    status: "ACTIVE" | "INACTIVE";
    
  };
  product:{ 
    id: number;
    name: string;
    status: "ACTIVE" | "INACTIVE";
  };
}