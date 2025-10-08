import { Router, Application } from "express";
import { CategoryController } from "../controllers/category.controller";

export class CategoryRoutes {
  public categoryController: CategoryController = new CategoryController();

  public routes(app: Application): void {
    app.route("/categorias").get(this.categoryController.getAllCategories); // Get all categories
    
    app.route("/categorias/:id").get(this.categoryController.getCategoryById); // Get a category by ID

    app.route("/categorias").post(this.categoryController.createCategory); // Create a new category
    
    app.route("/categorias/:id").put(this.categoryController.updateCategory); // Update a category by ID

    app.route("/categorias/:id").delete(this.categoryController.deleteCategory); // Delete a category by ID

    app.route("/categorias/id/:logic").get(this.categoryController.deleteCategoryAdv); // Advanced delete category
    
  }
}