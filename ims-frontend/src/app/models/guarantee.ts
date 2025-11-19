export interface GuaranteeI {
  id?: number;
  product_id: number;      // nombre o código del producto
  description: string;
  durationMonths: number;  // duración de la garantía
  terms?: string;          // condiciones
  status: "ACTIVE" | "EXPIRED";
  createdAt?: Date;

  product: {
    id: number;
    name: string;
    status: "ACTIVE" | "INACTIVE";
  };
}

