import { Router, Application } from "express";
import { ProductController } from "../controllers/product.controller";

export class ProductRoutes {
  public productController: ProductController = new ProductController();

  public routes(app: Application): void {

    app.route("/productos").get(this.productController.getAllProducts); // Get all products
    
    app.route("/productos/:id").get(this.productController.getproductById); // Get a sale by ID

    app.route("/productos").post(this.productController.createProduct); // Create a new product

    app.route("/productos/:id").put(this.productController.updateProduct); // Update a product by ID

    app.route("/productos/:id").delete(this.productController.deleteProduct); // Delete a product by ID

    app.route("/productos/id/:logic").get(this.productController.deleteProductAdv); // Advanced delete product

  }
}