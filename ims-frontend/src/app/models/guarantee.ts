export interface GuaranteeI {
  id?: number;
  product: string;      // nombre o código del producto
  description: string;
  durationMonths: number;  // duración de la garantía
  terms?: string;          // condiciones
  status: "ACTIVE" | "EXPIRED";
  createdAt?: Date;
}