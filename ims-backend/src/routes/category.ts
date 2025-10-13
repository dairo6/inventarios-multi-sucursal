import { Router, Application } from "express";
import { CategoryController } from "../controllers/category.controller";
import { authMiddleware } from "../middleware/auth";
export class CategoryRoutes {
  public categoryController: CategoryController = new CategoryController();

  public routes(app: Application): void {

    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/categorias")
      .get(this.categoryController.getAllCategories) // Get all categories
      .post(this.categoryController.createCategory); // create a new category


    app.route("/categorias/:id")
      .get(this.categoryController.getCategoryById) // Get a category by ID
      .patch(this.categoryController.updateCategory) // Update a category by ID
      .delete(this.categoryController.deleteCategory); // Delete a category by ID

    app.route("/categorias/:id/logic")
      .delete(this.categoryController.deleteCategoryAdv); // Advanced delete category
    

    // ================== RUTAS CON AUTENTICACIÓN ==================
        // Si se requieren rutas protegidas, se pueden agregar aquí:
     
    app.route("/api/categorias")
      .get(authMiddleware, this.categoryController.getAllCategories) // Get all categories
      .post(authMiddleware, this.categoryController.createCategory); // create a new category

    app.route("/api/categorias/:id")
      .get(authMiddleware, this.categoryController.getCategoryById) // Get a category by ID
      .patch(authMiddleware, this.categoryController.updateCategory) // Update a category by ID
      .delete(authMiddleware, this.categoryController.deleteCategory); // Delete a category by ID

    app.route("/api/categorias/:id/logic")
      .delete(authMiddleware, this.categoryController.deleteCategoryAdv); // Advanced delete category 

        
  }
}