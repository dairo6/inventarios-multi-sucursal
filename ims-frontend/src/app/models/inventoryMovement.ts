export interface InventoryMovementI {
  id?: number;
  product: string;
  warehouse: string;    // almacén origen o destino
  lot?: string;        // opcional, para productos con lotes
  movementType: "IN" | "OUT" | "TRANSFER";
  quantity: number;
  reference?: string;      // ej: factura, devolución
  createdAt?: Date;
  user?: string;         // quién lo registró
}