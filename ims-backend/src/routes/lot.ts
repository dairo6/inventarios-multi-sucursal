import { Router, Application } from "express";
import { LotController } from "../controllers/lot.controller";

export class LotRoutes {
    public lotController: LotController = new LotController();

    public routes(app: Application): void {
        app.route("/lotes").get(this.lotController.getAllLots); // Get all lots

        app.route("/lotes/:id").get(this.lotController.getLotById); // Get a lot by ID

        app.route("/lotes").post(this.lotController.createLot); // Create a new lot

        app.route("/lotes/:id").put(this.lotController.updateLot); // Update a lot by ID

        app.route("/lotes/:id").delete(this.lotController.deleteLot); // Delete a lot by ID

        app.route("/lotes/id/:logic").get(this.lotController.deleteLotAdv); // Advanced delete lot

    }
}