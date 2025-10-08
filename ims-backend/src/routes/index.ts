import { Router } from "express";
import { ProductRoutes } from "./product";
import { BranchRoutes } from "./branch";
import { CategoryRoutes } from "./category";
import { GuaranteeRoutes } from "./guarantee";
import { InventoryMovementRoutes } from "./inventorymovement";
import { LocationRoutes } from "./location";
import { LotRoutes } from "./lot";
import { StockBranchRoutes } from "./stockbranch";
import { SupplierRoutes } from "./supplier";
import { WarehouseRoutes } from "./warehouse";


export class Routes {
  public productRoutes: ProductRoutes = new ProductRoutes();
  public branchRoutes: BranchRoutes = new BranchRoutes();
  public categoryRoutes: CategoryRoutes = new CategoryRoutes();
  public guaranteeRoutes: GuaranteeRoutes = new GuaranteeRoutes();
  public inventoryMovementRoutes: InventoryMovementRoutes = new InventoryMovementRoutes();
  public locationRoutes: LocationRoutes = new LocationRoutes();
  public lotRoutes: LotRoutes = new LotRoutes();
  public stockBranchRoutes: StockBranchRoutes = new StockBranchRoutes();
  public supplierRoutes: SupplierRoutes = new SupplierRoutes();
  public warehouseRoutes: WarehouseRoutes = new WarehouseRoutes();
  
}