export interface CategoryI {
    id?: number;
    name: string;
    description?: string;
    status: "ACTIVE" | "INACTIVE";
}

export interface CategoryResponseI {
  id?: number;
  name: string;
  description?: string;
}