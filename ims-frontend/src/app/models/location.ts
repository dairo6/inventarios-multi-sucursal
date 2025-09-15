export interface LocationI {
  id?: number;
  warehouse: String; // almacén
  code: string;            // ej: pasillo A, estante 3
  description?: string;
  status: "AVAILABLE" | "OCCUPIED" | "BLOCKED";
}