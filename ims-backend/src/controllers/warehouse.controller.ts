import { Request, Response } from "express";
import { Warehouse, WarehouseI } from "../models/warehouse";

export class WarehouseController {
  // ✅ Obtener todos los almacenes activos
  public async getAllWarehouses(req: Request, res: Response) {
    try {
      const warehouses: WarehouseI[] = await Warehouse.findAll({
        where: { status: "ACTIVE" },
      });
      res.status(200).json({ warehouses });
    } catch (error) {
      res.status(500).json({ error: "Error fetching warehouses" });
    }
  }

  // ✅ Obtener un almacén por ID
  public async getWarehouseById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const warehouse = await Warehouse.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (warehouse) {
        res.status(200).json(warehouse);
      } else {
        res.status(404).json({ error: "Warehouse not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching warehouse" });
    }
  }

  // ✅ Crear un nuevo almacén
  public async createWarehouse(req: Request, res: Response) {
    const { branch_id, name, code, description, status } = req.body;

    try {
      const body: WarehouseI = {
        branch_id,
        name,
        code,
        description,
        status,
      };

      const newWarehouse = await Warehouse.create({ ...body });
      res.status(201).json(newWarehouse);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // ✅ Actualizar un almacén
  public async updateWarehouse(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { branch_id, name, code, description, status } = req.body;

    try {
      const body: WarehouseI = {
        branch_id,
        name,
        code,
        description,
        status,
      };

      const warehouseExist = await Warehouse.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (warehouseExist) {
        await warehouseExist.update(body);
        res.status(200).json(warehouseExist);
      } else {
        res.status(404).json({ error: "Warehouse not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // ✅ Eliminación física
  public async deleteWarehouse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const warehouseToDelete = await Warehouse.findByPk(id);

      if (warehouseToDelete) {
        await warehouseToDelete.destroy();
        res.status(200).json({ message: "Warehouse deleted successfully" });
      } else {
        res.status(404).json({ error: "Warehouse not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting warehouse" });
    }
  }

  // ✅ Eliminación lógica (status → INACTIVE)
  public async deleteWarehouseAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const warehouseToUpdate = await Warehouse.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (warehouseToUpdate) {
        await warehouseToUpdate.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Warehouse marked as inactive" });
      } else {
        res.status(404).json({ error: "Warehouse not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking warehouse as inactive" });
    }
  }
}
