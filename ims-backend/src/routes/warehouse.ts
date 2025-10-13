import { Router, Application } from "express";
import { WarehouseController } from "../controllers/warehouse.controller";
import { authMiddleware } from "../middleware/auth";
export class WarehouseRoutes {
    public warehouseController: WarehouseController = new WarehouseController();

    public routes(app: Application): void {

        // ================== RUTAS SIN AUTENTICACIÓN ==================
        
        app.route("/bodegas")
            .get(this.warehouseController.getAllWarehouses) // Get all warehouses
            .post(this.warehouseController.createWarehouse); // Create a new warehouse

        app.route("/bodegas/:id")
            .get(this.warehouseController.getWarehouseById) // Get a warehouse by ID
            .patch(this.warehouseController.updateWarehouse) // Update a warehouse by ID
            .delete(this.warehouseController.deleteWarehouse); // Delete a warehouse by ID

        app.route("/bodegas/:id/logic")
            .delete(this.warehouseController.deleteWarehouseAdv); // Advanced delete warehouse


        // ================== RUTAS CON AUTENTICACIÓN ==================
        // Si se requieren rutas protegidas, se pueden agregar aquí:

        app.route("/api/bodegas")
            .get(authMiddleware, this.warehouseController.getAllWarehouses) // Get all warehouses
            .post(authMiddleware, this.warehouseController.createWarehouse); // Create a new warehouse

        app.route("/api/bodegas/:id")
            .get(authMiddleware, this.warehouseController.getWarehouseById) // Get a warehouse by ID
            .patch(authMiddleware, this.warehouseController.updateWarehouse) // Update a warehouse by ID
            .delete(authMiddleware, this.warehouseController.deleteWarehouse); // Delete a warehouse by ID

        app.route("/api/bodegas/:id/logic")
            .delete(authMiddleware, this.warehouseController.deleteWarehouseAdv); // Advanced delete warehouse
        
    }
}