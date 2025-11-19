import { Request, Response } from "express";
import { Branch, BranchI } from "../models/branch";

export class BranchController {
  // ✅ Obtener todas las sucursales activas
  public async getAllBranches(req: Request, res: Response) {
    try {
      const branches: BranchI[] = await Branch.findAll({
        where: { status: "ACTIVE" },
      });
      res.status(200).json(branches); //cambiar 
    } catch (error) {
      res.status(500).json({ error: "Error fetching branches" });
    }
  }

  // ✅ Obtener una sucursal por ID
  public async getBranchById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const branch = await Branch.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (branch) {
        res.status(200).json(branch);
      } else {
        res.status(404).json({ error: "Branch not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching branch" });
    }
  }

  // ✅ Crear una nueva sucursal
  public async createBranch(req: Request, res: Response) {
    const { name, code, address, phone, email, status } = req.body;

    try {
      const body: BranchI = {
        name,
        code,
        address,
        phone,
        email,
        status,
      };

      const newBranch = await Branch.create({ ...body });
      res.status(201).json(newBranch);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // ✅ Actualizar una sucursal
  public async updateBranch(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { name, code, address, phone, email, status } = req.body;

    try {
      const body: BranchI = {
        name,
        code,
        address,
        phone,
        email,
        status,
      };

      const branchExist = await Branch.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (branchExist) {
        await branchExist.update(body);
        res.status(200).json(branchExist);
      } else {
        res.status(404).json({ error: "Branch not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // ✅ Eliminación física
  public async deleteBranch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const branchToDelete = await Branch.findByPk(id);

      if (branchToDelete) {
        await branchToDelete.destroy();
        res.status(200).json({ message: "Branch deleted successfully" });
      } else {
        res.status(404).json({ error: "Branch not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting branch" });
    }
  }

  // ✅ Eliminación lógica (status → INACTIVE)
  public async deleteBranchAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const branchToUpdate = await Branch.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (branchToUpdate) {
        await branchToUpdate.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Branch marked as inactive" });
      } else {
        res.status(404).json({ error: "Branch not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking branch as inactive" });
    }
  }
}
