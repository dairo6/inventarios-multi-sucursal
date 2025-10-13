import { Router, Application } from "express";
import { ResourceController } from "../../controllers/authorization/resource.controller";
import { authMiddleware } from '../../middleware/auth';

export class ResourceRoutes {
  public resourceController: ResourceController = new ResourceController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/resources")
      .get(this.resourceController.getAllResources)
      .post(this.resourceController.createResource);

    app.route("/api/resources/:id")
      .get(this.resourceController.getResourceById)
      .patch(this.resourceController.updateResource)
      .delete(this.resourceController.deleteResource);

    app.route("/api/resources/:id/logic")
      .delete(this.resourceController.deleteResourceAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    // Si se requieren rutas protegidas, se pueden agregar aquí:

    app.route("/api/resources")
      .get(authMiddleware, this.resourceController.getAllResources)
      .post(authMiddleware, this.resourceController.createResource);

    app.route("/api/resources/:id")
      .get(authMiddleware, this.resourceController.getResourceById)
      .patch(authMiddleware, this.resourceController.updateResource)
      .delete(authMiddleware, this.resourceController.deleteResource);

    app.route("/api/resources/:id/logic")
      .delete(authMiddleware, this.resourceController.deleteResourceAdv);


  }
}