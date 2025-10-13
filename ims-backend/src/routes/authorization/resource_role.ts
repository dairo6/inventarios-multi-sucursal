import { Router, Application } from "express";  
import { ResourceRoleController } from "../../controllers/authorization/resource_role.controller";
import { authMiddleware } from '../../middleware/auth';

export class ResourceRoleRoutes {
  public resourceRoleController: ResourceRoleController = new ResourceRoleController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/resource-roles")
      .get(this.resourceRoleController.getAllResourceRoles)
      .post(this.resourceRoleController.createResourceRole);

    app.route("/api/resource-roles/:id")
      .get(this.resourceRoleController.getResourceRoleById)
      .patch(this.resourceRoleController.updateResourceRole)
      .delete(this.resourceRoleController.deleteResourceRole);

    app.route("/api/resource-roles/:id/logic")
      .delete(this.resourceRoleController.deleteResourceRoleAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    // Si se requieren rutas protegidas, se pueden agregar aquí:

    app.route("/api/resourceRoles")
      .get(authMiddleware, this.resourceRoleController.getAllResourceRoles)
      .post(authMiddleware, this.resourceRoleController.createResourceRole);

    app.route("/api/resourceRoles/:id")
      .get(authMiddleware, this.resourceRoleController.getResourceRoleById)
      .patch(authMiddleware, this.resourceRoleController.updateResourceRole)
      .delete(authMiddleware, this.resourceRoleController.deleteResourceRole);

    app.route("/api/resourceRoles/:id/logic")
      .delete(authMiddleware, this.resourceRoleController.deleteResourceRoleAdv);
    
  }
}   