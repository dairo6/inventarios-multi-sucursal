import { Router, Application } from "express";
import { ProductController } from "../controllers/product.controller";

export class ProductRoutes {
  public productController: ProductController = new ProductController();

  public routes(app: Application): void {
    app.route("/productos").get(this.productController.getAllProducts); // Get all sales
    app.route("/productos/:id").get(this.productController.getproductById); // Get a sale by ID

  }
}