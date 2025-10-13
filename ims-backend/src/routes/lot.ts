import { Router, Application } from "express";
import { LotController } from "../controllers/lot.controller";
import { authMiddleware } from "../middleware/auth";
export class LotRoutes {
    public lotController: LotController = new LotController();

    public routes(app: Application): void {

        // ================== RUTAS SIN AUTENTICACIÓN ==================
        app.route("/lotes")
            .get(this.lotController.getAllLots) // Get all lots
            .post(this.lotController.createLot); // Create a new lot

        app.route("/lotes/:id")
            .get(this.lotController.getLotById) // Get a lot by ID
            .patch(this.lotController.updateLot) // Update a lot by ID
            .delete(this.lotController.deleteLot); // Delete a lot by ID

        app.route("/lotes/:id/logic")
            .delete(this.lotController.deleteLotAdv); // Advanced delete lot


        // ================== RUTAS CON AUTENTICACIÓN ==================
        // Si se requieren rutas protegidas, se pueden agregar aquí:

        app.route("/api/lotes")
            .get(authMiddleware, this.lotController.getAllLots) // Get all lots
            .post(authMiddleware, this.lotController.createLot); // Create a new lot

        app.route("/api/lotes/:id")
            .get(authMiddleware, this.lotController.getLotById) // Get a lot by ID
            .patch(authMiddleware, this.lotController.updateLot) // Update a lot by ID
            .delete(authMiddleware, this.lotController.deleteLot); // Delete a lot by ID

        app.route("/api/lotes/:id/logic")
            .delete(authMiddleware, this.lotController.deleteLotAdv); // Advanced delete lot
    }
}