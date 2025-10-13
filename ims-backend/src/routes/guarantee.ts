import { Router, Application } from "express";
import { GuaranteeController } from "../controllers/guarantee.controller";
import { authMiddleware } from "../middleware/auth";
export class GuaranteeRoutes {
    public guaranteeController: GuaranteeController = new GuaranteeController();

    public routes(app: Application): void {

        // ================== RUTAS SIN AUTENTICACIÓN ==================
        app.route("/garantias")
            .get(this.guaranteeController.getAllGuarantees) // Get all guarantees
            .post(this.guaranteeController.createGuarantee); // Create a new guarantee

        app.route("/garantias/:id")
            .get(this.guaranteeController.getGuaranteeById) // Get a guarantee by ID
            .patch(this.guaranteeController.updateGuarantee) // Update a guarantee by ID
            .delete(this.guaranteeController.deleteGuarantee); // Delete a guarantee by ID

        app.route("/garantias/:id/logic")
            .delete(this.guaranteeController.deleteGuaranteeAdv); // Advanced delete guarantee 
        
        // ================== RUTAS CON AUTENTICACIÓN ==================
        // Si se requieren rutas protegidas, se pueden agregar aquí:

        app.route("/api/garantias")
            .get(authMiddleware, this.guaranteeController.getAllGuarantees) // Get all guarantees
            .post(authMiddleware, this.guaranteeController.createGuarantee); // Create a new guarantee

        app.route("/api/garantias/:id")
            .get(authMiddleware, this.guaranteeController.getGuaranteeById) // Get a guarantee by ID
            .patch(authMiddleware, this.guaranteeController.updateGuarantee) // Update a guarantee by ID
            .delete(authMiddleware, this.guaranteeController.deleteGuarantee); // Delete a guarantee by ID

        app.route("/api/garantias/:id/logic")
            .delete(authMiddleware, this.guaranteeController.deleteGuaranteeAdv); // Advanced delete guarantee  
        
    }
}