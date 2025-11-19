export interface InventoryMovementI {
  id?: number;
  product_id: string;
  warehouse_id: string;    // almacén origen o destino
  lot_id?: string;        // opcional, para productos con lotes
  movementType: "IN" | "OUT" | "TRANSFER";
  quantity: number;
  reference?: string;      // ej: factura, devolución
  status?: "ACTIVE" | "INACTIVE"; // estado del movimiento
  createdAt?: Date;

  product:{
    id: number;
    name: string;
    status: "ACTIVE" | "INACTIVE";
  }

  warehouse:{
    id: number;
    name: string;
    status: "ACTIVE" | "INACTIVE";
  }

  lot?:{
    id: number;
    code: string;
    expirationDate: Date;
    status: "ACTIVE" | "INACTIVE";
  }
}