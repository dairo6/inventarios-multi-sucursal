export interface BranchI {
  id?: number;
  name: string;
  code: string;            // código único de sucursal
  address: string;
  phone?: string;
  email?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BranchResponseI {
  id?: number;
  name: string;
  code: string;            // código único de sucursal
  address: string;
  phone?: string;
  email?: string;
}