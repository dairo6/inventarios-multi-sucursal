import { Router, Application } from "express";
import { InventoryMovementController } from "../controllers/inventorymovement.controller";

export class InventoryMovementRoutes {
  public inventoryMovementController: InventoryMovementController = new InventoryMovementController();

  public routes(app: Application): void {
    app.route("/movimientos-inventario").get(this.inventoryMovementController.getAllMovements); // Get all inventory movements

    app.route("/movimientos-inventario/:id").get(this.inventoryMovementController.getMovementById); // Get an inventory movement by ID

    app.route("/movimientos-inventario").post(this.inventoryMovementController.createMovement); // Create a new inventory movement

    app.route("/movimientos-inventario/:id").put(this.inventoryMovementController.updateMovement); // Update an inventory movement by ID

    app.route("/movimientos-inventario/:id").delete(this.inventoryMovementController.deleteMovement); // Delete an inventory movement by ID

    app.route("/movimientos-inventario/id/:logic").get(this.inventoryMovementController.deleteInventoryMovementAdv); // Advanced delete inventory movement

  }
}   