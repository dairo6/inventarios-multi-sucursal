export interface StockBranchI {
  id?: number;
  branch: string;
  product: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  status?: "ACTIVE" | "INACTIVE";
  updatedAt?: Date;
}