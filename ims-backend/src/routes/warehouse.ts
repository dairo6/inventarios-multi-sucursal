import { Router, Application } from "express";
import { WarehouseController } from "../controllers/warehouse.controller";

export class WarehouseRoutes {
    public warehouseController: WarehouseController = new WarehouseController();

    public routes(app: Application): void {
        app.route("/bodegas").get(this.warehouseController.getAllWarehouses); // Get all warehouses

        app.route("/bodegas/:id").get(this.warehouseController.getWarehouseById); // Get a warehouse by ID

        app.route("/bodegas").post(this.warehouseController.createWarehouse); // Create a new warehouse

        app.route("/bodegas/:id").put(this.warehouseController.updateWarehouse); // Update a warehouse by ID

        app.route("/bodegas/:id").delete(this.warehouseController.deleteWarehouse); // Delete a warehouse by ID

        app.route("/bodegas/id/:logic").get(this.warehouseController.deleteWarehouseAdv); // Advanced delete warehouse

    }
}