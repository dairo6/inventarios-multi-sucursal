export interface LotI {
  id?: number;
  product_id: number;       // id del producto asociado
  code: string;            // lote asignado
  expirationDate?: Date;
  quantity?: number;
  status: "AVAILABLE" | "EXPIRED" | "BLOCKED";
  createdAt?: Date;

  product?: {
    id: number;
    name: string;
    status: "ACTIVE" | "INACTIVE";
  }
}