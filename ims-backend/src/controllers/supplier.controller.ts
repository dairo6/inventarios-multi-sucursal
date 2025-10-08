import { Request, Response } from "express";
import { Supplier, SupplierI } from "../models/supplier";

export class SupplierController {
  // get all suppliers with status "ACTIVE"
  public async getAllSuppliers(req: Request, res: Response) {
    try {
      const suppliers: SupplierI[] = await Supplier.findAll({
        where: { status: "ACTIVE" },
      });
      res.status(200).json({ suppliers });
    } catch (error) {
      res.status(500).json({ error: "Error fetching suppliers" });
    }
  }

  // get a supplier by ID
  public async getSupplierById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const supplier = await Supplier.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (supplier) {
        res.status(200).json(supplier);
      } else {
        res.status(404).json({ error: "Supplier not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching supplier" });
    }
  }

  // Create a new supplier
  public async createSupplier(req: Request, res: Response) {
    const { name, taxId, contactName, phone, email, address, status } = req.body;

    try {
      const body: SupplierI = {
        name,
        taxId,
        contactName,
        phone,
        email,
        address,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
        
      };

      const newSupplier = await Supplier.create({ ...body });
      res.status(201).json(newSupplier);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update a supplier
  public async updateSupplier(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { name, taxId, contactName, phone, email, address, status } = req.body;

    try {
      const supplierExist = await Supplier.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (supplierExist) {
        await supplierExist.update({
          name,
          taxId,
          contactName,
          phone,
          email,
          address,
          status,
          updatedAt: new Date(),
        });
        res.status(200).json(supplierExist);
      } else {
        res.status(404).json({ error: "Supplier not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a supplier physically
  public async deleteSupplier(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const supplierToDelete = await Supplier.findByPk(id);

      if (supplierToDelete) {
        await supplierToDelete.destroy();
        res.status(200).json({ message: "Supplier deleted successfully" });
      } else {
        res.status(404).json({ error: "Supplier not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting supplier" });
    }
  }

  // Delete a supplier logically (set status to "INACTIVE")
  public async deleteSupplierAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const supplierToUpdate = await Supplier.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (supplierToUpdate) {
        await supplierToUpdate.update({ status: "INACTIVE", updatedAt: new Date() });
        res.status(200).json({ message: "Supplier marked as inactive" });
      } else {
        res.status(404).json({ error: "Supplier not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking supplier as inactive" });
    }
  }
}
