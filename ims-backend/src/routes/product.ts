import { Router, Application } from "express";
import { ProductController } from "../controllers/product.controller";
import { authMiddleware } from "../middleware/auth";
export class ProductRoutes {
  public productController: ProductController = new ProductController();

  public routes(app: Application): void {

    // ================== RUTAS SIN AUTENTICACIÓN ==================

    app.route("/productos")
      .get(this.productController.getAllProducts) // Get all products
      .post(this.productController.createProduct); // Create a new product

    app.route("/productos/:id")
      .get(this.productController.getproductById) // Get a sale by ID
      .patch(this.productController.updateProduct) // Update a product by ID
      .delete(this.productController.deleteProduct); // Delete a product by ID

    app.route("/productos/:id/logic")
      .delete(this.productController.deleteProductAdv);


    // ================== RUTAS CON AUTENTICACIÓN ==================
    // Si se requieren rutas protegidas, se pueden agregar aquí:

    app.route("/api/productos")
      .get(authMiddleware, this.productController.getAllProducts) // Get all products
      .post(authMiddleware, this.productController.createProduct); // Create a new product

    app.route("/api/productos/:id")
      .get(authMiddleware, this.productController.getproductById) // Get a sale by ID
      .patch(authMiddleware, this.productController.updateProduct) // Update a product by ID
      .delete(authMiddleware, this.productController.deleteProduct); // Delete a product by ID

    app.route("/api/productos/:id/logic")
      .delete(authMiddleware, this.productController.deleteProductAdv);
  }
}