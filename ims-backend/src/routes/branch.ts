import { Router, Application } from "express";
import { BranchController } from "../controllers/branch.controller";

export class BranchRoutes {
    public branchController: BranchController = new BranchController();

    public routes(app: Application): void {
        app.route("/sucursales").get(this.branchController.getAllBranches); // Get all branches

        app.route("/sucursales/:id").get(this.branchController.getBranchById); // Get a branch by ID

        app.route("/sucursales").post(this.branchController.createBranch); // Create a new branch

        app.route("/sucursales/:id").put(this.branchController.updateBranch); // Update a branch by ID

        app.route("/sucursales/:id").delete(this.branchController.deleteBranch); // Delete a branch by ID

        app.route("/sucursales/id/:logic").get(this.branchController.deleteBranchAdv); // Advanced delete branch

    }
}