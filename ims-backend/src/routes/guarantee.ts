import { Router, Application } from "express";
import { GuaranteeController } from "../controllers/guarantee.controller";

export class GuaranteeRoutes {
    public guaranteeController: GuaranteeController = new GuaranteeController();

    public routes(app: Application): void {
        app.route("/garantias").get(this.guaranteeController.getAllGuarantees); // Get all guarantees

        app.route("/garantias/:id").get(this.guaranteeController.getGuaranteeById); // Get a guarantee by ID

        app.route("/garantias").post(this.guaranteeController.createGuarantee); // Create a new guarantee

        app.route("/garantias/:id").put(this.guaranteeController.updateGuarantee); // Update a guarantee by ID

        app.route("/garantias/:id").delete(this.guaranteeController.deleteGuarantee); // Delete a guarantee by ID

        app.route("/garantias/id/:logic").get(this.guaranteeController.deleteGuaranteeAdv); // Advanced delete guarantee    
    }
}