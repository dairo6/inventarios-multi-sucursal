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

import { UserRoutes } from "./authorization/user";
import { RoleRoutes } from "./authorization/role";
import { ResourceRoutes } from "./authorization/resource";
import { ResourceRoleRoutes } from "./authorization/resource_role";
import { RoleUserRoutes } from "./authorization/role_user";
import { RefreshTokenRoutes } from "./authorization/refresh_token";
import { AuthRoutes } from "./authorization/auth";



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

  public userRoutes: UserRoutes = new UserRoutes();
  public roleRoutes: RoleRoutes = new RoleRoutes();
  public roleUserRoutes: RoleUserRoutes = new RoleUserRoutes();
  public resourceRoutes: ResourceRoutes = new ResourceRoutes();
  public resourceRoleRoutes: ResourceRoleRoutes = new ResourceRoleRoutes();
  public refreshTokenRoutes: RefreshTokenRoutes = new RefreshTokenRoutes();
  public authRoutes: AuthRoutes = new AuthRoutes();
  
  
}