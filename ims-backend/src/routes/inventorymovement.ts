import { Router, Application } from "express";
import { InventoryMovementController } from "../controllers/inventorymovement.controller";
import { authMiddleware } from "../middleware/auth";
export class InventoryMovementRoutes {
  public inventoryMovementController: InventoryMovementController = new InventoryMovementController();

  public routes(app: Application): void {

    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/movimientos-inventario")
      .get(this.inventoryMovementController.getAllMovements) // Get all inventory movements
      .post(this.inventoryMovementController.createMovement); // Create a new inventory movement

    app.route("/movimientos-inventario/:id")
      .get(this.inventoryMovementController.getMovementById) // Get an inventory movement by ID
      .patch(this.inventoryMovementController.updateMovement) // Update an inventory movement by ID
      .delete(this.inventoryMovementController.deleteMovement); // Delete an inventory movement by ID

    app.route("/movimientos-inventario/:id/logic")
      .delete(this.inventoryMovementController.deleteInventoryMovementAdv); // Advanced delete inventory movement


    // ================== RUTAS CON AUTENTICACIÓN ==================
        // Si se requieren rutas protegidas, se pueden agregar aquí:

    app.route("/api/movimientos-inventario")
      .get(authMiddleware, this.inventoryMovementController.getAllMovements) // Get all inventory movements
      .post(authMiddleware, this.inventoryMovementController.createMovement); // Create a new inventory movement

    app.route("/api/movimientos-inventario/:id")
      .get(authMiddleware, this.inventoryMovementController.getMovementById) // Get an inventory movement by ID
      .patch(authMiddleware, this.inventoryMovementController.updateMovement) // Update an inventory movement by ID
      .delete(authMiddleware, this.inventoryMovementController.deleteMovement); // Delete an inventory movement by ID

    app.route("/api/movimientos-inventario/:id/logic")
      .delete(authMiddleware, this.inventoryMovementController.deleteInventoryMovementAdv); // Advanced delete inventory movement
  }
}   