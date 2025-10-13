import { Router, Application } from "express";
import { StockBranchController } from "../controllers/stockbranch.controller";
import { authMiddleware } from "../middleware/auth";
export class StockBranchRoutes {
    public stockBranchController: StockBranchController = new StockBranchController();

    public routes(app: Application): void {

        // ================== RUTAS SIN AUTENTICACIÓN ==================
        app.route("/stock-sucursales")
            .get(this.stockBranchController.getAllStockBranches) // Get all stock branches
            .post(this.stockBranchController.createStockBranch); // Create a new stock branch

        app.route("/stock-sucursales/:id")
            .get(this.stockBranchController.getStockBranchById) // Get a stock branch by ID
            .patch(this.stockBranchController.updateStockBranch) // Update a stock branch by ID  
            .delete(this.stockBranchController.deleteStockBranch); // Delete a stock branch by ID

        app.route("/stock-sucursales/:id/logic")
            .delete(this.stockBranchController.deleteStockBranchAdv); // Advanced delete stock branch


        // ================== RUTAS CON AUTENTICACIÓN ==================

        app.route("/api/stock-sucursales")
            .get(authMiddleware, this.stockBranchController.getAllStockBranches) // Get all stock branches
            .post(authMiddleware, this.stockBranchController.createStockBranch); // Create a new stock branch

        app.route("/api/stock-sucursales/:id")
            .get(authMiddleware, this.stockBranchController.getStockBranchById) // Get a stock branch by ID
            .patch(authMiddleware, this.stockBranchController.updateStockBranch) // Update a stock branch by ID  
            .delete(authMiddleware, this.stockBranchController.deleteStockBranch); // Delete a stock branch by ID

        app.route("/api/stock-sucursales/:id/logic")
            .delete(authMiddleware, this.stockBranchController.deleteStockBranchAdv); // Advanced delete stock branch
    }
}