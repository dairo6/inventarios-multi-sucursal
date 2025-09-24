import { Request, Response } from "express";
import { Product, ProductI } from "../models/product";

export class ProductController {
  // Get all clients with status "ACTIVE"
  public async getAllProducts(req: Request, res: Response) {
    try {
      const products: ProductI[] = await Product.findAll({
        where: { status: 'ACTIVE' },
      });
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ error: "Error fetching clients" });
    }
  }

  // Get a sale by ID
  public async getproductById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const product = await Product.findOne({
        where: { 
          id: pk, 
          status: "ACTIVE" },
      });
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Sale not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching sale" });
    }
  }
}