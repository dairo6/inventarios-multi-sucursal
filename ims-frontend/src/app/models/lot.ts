export interface LotI {
  id?: number;
  product: String;       // id del producto asociado
  code: string;            // lote asignado
  expirationDate?: Date;
  quantity: number;
  status: "AVAILABLE" | "EXPIRED" | "BLOCKED";
  createdAt?: Date;
}