import { Router, Application } from "express";
import { BranchController } from "../controllers/branch.controller";
import { authMiddleware } from "../middleware/auth";
export class BranchRoutes {
    public branchController: BranchController = new BranchController();

    public routes(app: Application): void {

        // ================== RUTAS SIN AUTENTICACIÓN ==================
        app.route("/sucursales")
            .get(this.branchController.getAllBranches) // Get all branches
            .post(this.branchController.createBranch); // create a new branch

        app.route("/sucursales/:id")
            .get(this.branchController.getBranchById) // Get a branch by ID
            .patch(this.branchController.updateBranch) // Update a branch by ID
            .delete(this.branchController.deleteBranch);  // Delete a branch by ID

    
        app.route("/sucursales/:id/logic")
            .delete(this.branchController.deleteBranchAdv); // Advanced delete branch

        // ================== RUTAS CON AUTENTICACIÓN ==================
        // Si se requieren rutas protegidas, se pueden agregar aquí:

        app.route("/api/sucursales")
            .get(authMiddleware, this.branchController.getAllBranches) // Get all branches
            .post(authMiddleware, this.branchController.createBranch); // create a new branch

        app.route("/api/sucursales/:id")
            .get(authMiddleware, this.branchController.getBranchById) // Get a branch by ID
            .patch(authMiddleware, this.branchController.updateBranch) // Update a branch by ID
            .delete(authMiddleware, this.branchController.deleteBranch);  // Delete a branch by ID

    
        app.route("/api/sucursales/:id/logic")
            .delete(authMiddleware, this.branchController.deleteBranchAdv); // Advanced delete branch
    }
}