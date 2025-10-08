import { Request, Response } from "express";
import { Guarantee, GuaranteeI } from "../models/guarantee";
import { Product } from "../models/product";

export class GuaranteeController {
  // get all guarantees with status "ACTIVE"
  public async getAllGuarantees(req: Request, res: Response) {
    try {
      const guarantees: GuaranteeI[] = await Guarantee.findAll({
        where: { status: "ACTIVE" },
        include: [{ model: Product, as: "product" }],
      });
      res.status(200).json({ guarantees });
    } catch (error) {
      res.status(500).json({ error: "Error fetching guarantees" });
    }
  }

  // get a guarantee by ID
  public async getGuaranteeById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const guarantee = await Guarantee.findOne({
        where: { id: pk, status: "ACTIVE" },
        include: [{ model: Product, as: "product" }],
      });

      if (guarantee) {
        res.status(200).json(guarantee);
      } else {
        res.status(404).json({ error: "Guarantee not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching guarantee" });
    }
  }

  // Create a new guarantee
  public async createGuarantee(req: Request, res: Response) {
    const { product_id, description, durationMonths, terms, status } = req.body;

    try {
      const body: GuaranteeI = {
        product_id,
        description,
        durationMonths,
        terms,
        status,
        createdAt: new Date(),
      };

      const newGuarantee = await Guarantee.create({ ...body });
      res.status(201).json(newGuarantee);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update a guarantee
  public async updateGuarantee(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { product_id, description, durationMonths, terms, status } = req.body;

    try {
      const guaranteeExist = await Guarantee.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (guaranteeExist) {
        await guaranteeExist.update({
          product_id,
          description,
          durationMonths,
          terms,
          status,
        });
        res.status(200).json(guaranteeExist);
      } else {
        res.status(404).json({ error: "Guarantee not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a guarantee physically  
  public async deleteGuarantee(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const guaranteeToDelete = await Guarantee.findByPk(id);

      if (guaranteeToDelete) {
        await guaranteeToDelete.destroy();
        res.status(200).json({ message: "Guarantee deleted successfully" });
      } else {
        res.status(404).json({ error: "Guarantee not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting guarantee" });
    }
  }

  // Delete a guarantee logically (set status to "EXPIRED")
  public async deleteGuaranteeAdv(req: Request, res: Response) {
        try {
        const { id: pk } = req.params;
        const guaranteeToUpdate = await Guarantee.findOne({
            where: { id: pk, status: "ACTIVE" },
        });

        if (guaranteeToUpdate) {
            await guaranteeToUpdate.update({ status: "EXPIRED" });
            res.status(200).json({ message: "Guarantee marked as expired" });
        } else {
            res.status(404).json({ error: "Guarantee not found" });
        }
        } catch (error) {
        res.status(500).json({ error: "Error marking guarantee as expired" });
        }
    }
}
