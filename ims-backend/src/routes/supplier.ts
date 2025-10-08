import { Router, Application } from "express";
import { SupplierController } from "../controllers/supplier.controller";

export class SupplierRoutes {
    public supplierController: SupplierController = new SupplierController();

    public routes(app: Application): void {
        app.route("/proveedores").get(this.supplierController.getAllSuppliers); // Get all suppliers

        app.route("/proveedores/:id").get(this.supplierController.getSupplierById); // Get a supplier by ID

        app.route("/proveedores").post(this.supplierController.createSupplier); // Create a new supplier

        app.route("/proveedores/:id").put(this.supplierController.updateSupplier); // Update a supplier by ID

        app.route("/proveedores/:id").delete(this.supplierController.deleteSupplier); // Delete a supplier by ID

        app.route("/proveedores/id/:logic").get(this.supplierController.deleteSupplierAdv); // Advanced delete supplier

    }
}