import { Request, Response } from "express";
import { StockBranch, StockBranchI } from "../models/stockbranch";
import { Product } from "../models/product";
import { Branch } from "../models/branch";

export class StockBranchController {
  // get all stock branches with status "ACTIVE"
  public async getAllStockBranches(req: Request, res: Response) {
    try {
      const stockBranches: StockBranchI[] = await StockBranch.findAll({
        where: { status: "ACTIVE" },
        include: [
          { model: Product, as: 'product' },
          { model: Branch, as: 'branch' },
        ],
      });
      res.status(200).json( stockBranches );
    } catch (error) {
      res.status(500).json({ error: "Error fetching stock branches" });
    }
  }

  // get a stock branch by ID
  public async getStockBranchById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const stockBranch = await StockBranch.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (stockBranch) {
        res.status(200).json(stockBranch);
      } else {
        res.status(404).json({ error: "Stock branch not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching stock branch" });
    }
  }

  // Create a new stock branch
  public async createStockBranch(req: Request, res: Response) {
    const { branch_id, product_id, quantity, minStock, maxStock, status } = req.body;

    try {
      const body: StockBranchI = {
        branch_id,
        product_id,
        quantity,
        minStock,
        maxStock,
        status,
        updatedAt: new Date(),
        
      };

      const newStockBranch = await StockBranch.create({ ...body });
      res.status(201).json(newStockBranch);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update a stock branch
  public async updateStockBranch(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { branch_id, product_id, quantity, minStock, maxStock, status } = req.body;

    try {
      const stockBranchExist = await StockBranch.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (stockBranchExist) {
        await stockBranchExist.update({
          branch_id,
          product_id,
          quantity,
          minStock,
          maxStock,
          status,
          updatedAt: new Date(),
        });
        res.status(200).json(stockBranchExist);
      } else {
        res.status(404).json({ error: "Stock branch not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a stock branch physically
  public async deleteStockBranch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const stockBranchToDelete = await StockBranch.findByPk(id);

      if (stockBranchToDelete) {
        await stockBranchToDelete.destroy();
        res.status(200).json({ message: "Stock branch deleted successfully" });
      } else {
        res.status(404).json({ error: "Stock branch not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting stock branch" });
    }
  }

  // Delete a stock branch logically (set status to "INACTIVE")
  public async deleteStockBranchAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const stockBranchToUpdate = await StockBranch.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (stockBranchToUpdate) {
        await stockBranchToUpdate.update({ status: "INACTIVE", updatedAt: new Date() });
        res.status(200).json({ message: "Stock branch marked as inactive" });
      } else {
        res.status(404).json({ error: "Stock branch not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking stock branch as inactive" });
    }
  }
}
