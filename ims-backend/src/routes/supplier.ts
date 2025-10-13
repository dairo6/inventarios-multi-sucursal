import { Router, Application } from "express";
import { SupplierController } from "../controllers/supplier.controller";
import { authMiddleware } from "../middleware/auth";
export class SupplierRoutes {
    public supplierController: SupplierController = new SupplierController();

    public routes(app: Application): void {

        // ================== RUTAS SIN AUTENTICACIÓN ==================
        app.route("/proveedores")
            .get(this.supplierController.getAllSuppliers) // Get all suppliers
            .post(this.supplierController.createSupplier); // Create a new supplier

        app.route("/proveedores/:id")
            .get(this.supplierController.getSupplierById) // Get a supplier by ID
            .patch(this.supplierController.updateSupplier) // Update a supplier by ID
            .delete(this.supplierController.deleteSupplier); // Delete a supplier by ID

        app.route("/proveedores/:id/logic")
            .delete(this.supplierController.deleteSupplierAdv); // Advanced delete supplier


        // ================== RUTAS CON AUTENTICACIÓN ==================
        // Si se requieren rutas protegidas, se pueden agregar aquí:

        app.route("/api/proveedores")
            .get(authMiddleware, this.supplierController.getAllSuppliers) // Get all suppliers
            .post(authMiddleware, this.supplierController.createSupplier); // Create a new supplier

        app.route("/api/proveedores/:id")
            .get(authMiddleware, this.supplierController.getSupplierById) // Get a supplier by ID
            .patch(authMiddleware, this.supplierController.updateSupplier) // Update a supplier by ID
            .delete(authMiddleware, this.supplierController.deleteSupplier); // Delete a supplier by ID

        app.route("/api/proveedores/:id/logic")
            .delete(authMiddleware, this.supplierController.deleteSupplierAdv); // Advanced delete supplier
    }
}