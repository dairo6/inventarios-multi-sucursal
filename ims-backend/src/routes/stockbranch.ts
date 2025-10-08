import { Router, Application } from "express";
import { StockBranchController } from "../controllers/stockbranch.controller";

export class StockBranchRoutes {
    public stockBranchController: StockBranchController = new StockBranchController();

    public routes(app: Application): void {
        app.route("/stock-sucursal").get(this.stockBranchController.getAllStockBranches); // Get all stock branches

        app.route("/stock-sucursal/:id").get(this.stockBranchController.getStockBranchById); // Get a stock branch by ID

        app.route("/stock-sucursal").post(this.stockBranchController.createStockBranch); // Create a new stock branch
        
        app.route("/stock-sucursal/:id").put(this.stockBranchController.updateStockBranch); // Update a stock branch by ID  

        app.route("/stock-sucursal/:id").delete(this.stockBranchController.deleteStockBranch); // Delete a stock branch by ID

        app.route("/stock-sucursal/id/:logic").get(this.stockBranchController.deleteStockBranchAdv); // Advanced delete stock branch

    }
}