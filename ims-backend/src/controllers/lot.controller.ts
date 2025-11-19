import { Request, Response } from "express";
import { Lot, LotI } from "../models/lot";
import { Product } from "../models/product";
import { Op } from "sequelize";

export class LotController {

  // Get all lots with status AVAILABLE or EXPIRED
  public async getAllLots(req: Request, res: Response) {
    try {
      const lots: LotI[] = await Lot.findAll({
        where: {
          status: { [Op.or]: ["AVAILABLE", "EXPIRED"] }  
        },
        include: [{ model: Product, as: "product" }],
      });

      res.status(200).json(lots);
    } catch (error) {
      res.status(500).json({ error: "Error fetching lots" });
    }
  }

  // Get a lot by ID
  public async getLotById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;

      const lot = await Lot.findOne({
        where: { id: pk },
      });

      if (lot) {
        res.status(200).json(lot);
      } else {
        res.status(404).json({ error: "Lot not found or unavailable" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching lot" });
    }
  }

  // Create a new lot
  public async createLot(req: Request, res: Response) {
    const { product_id, code, expirationDate, quantity, status } = req.body;

    try {
      const body: LotI = {
        product_id,
        code,
        expirationDate,
        quantity,
        status,
        createdAt: new Date(),
      };

      const newLot = await Lot.create({ ...body });
      res.status(201).json(newLot);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update a lot
  public async updateLot(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { product_id, code, expirationDate, quantity, status } = req.body;

    try {
      const lotExist = await Lot.findOne({
        where: { id: pk, status: "AVAILABLE" },  // Solo permite modificar disponibles
      });

      if (lotExist) {
        await lotExist.update({
          product_id,
          code,
          expirationDate,
          quantity,
          status,
        });
        res.status(200).json(lotExist);
      } else {
        res.status(404).json({ error: "Lot not found or unavailable" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a lot physically
  public async deleteLot(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const lotToDelete = await Lot.findByPk(id);

      if (lotToDelete) {
        await lotToDelete.destroy();
        res.status(200).json({ message: "Lot deleted successfully" });
      } else {
        res.status(404).json({ error: "Lot not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting lot" });
    }
  }

  // Delete a lot logically (set status to "BLOCKED")
  public async deleteLotAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;

      const lotToUpdate = await Lot.findOne({
        where: { id: pk, status: "AVAILABLE" },  // Solo se pueden bloquear los disponibles
      });

      if (lotToUpdate) {
        await lotToUpdate.update({ status: "BLOCKED" }); 
        res.status(200).json({ message: "Lot marked as blocked" });
      } else {
        res.status(404).json({ error: "Lot not found or unavailable" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking lot as blocked" });
    }
  }
}
