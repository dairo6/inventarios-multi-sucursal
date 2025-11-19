export interface SupplierI {
  id?: number;
  name: string;
  taxId: string;           // NIT, RUT, RFC...
  contactName?: string;
  phone?: string;
  email?: string;
  address?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SupplierResponseI {
  id?: number;
  name: string;
  taxId: string;           // NIT, RUT, RFC...
  contactName?: string;
  phone?: string;
  email?: string;
  address?: string;
}