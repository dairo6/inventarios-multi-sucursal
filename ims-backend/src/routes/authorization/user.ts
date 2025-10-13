import { Router, Application } from "express";
import { authMiddleware } from "../../middleware/auth";
import { UserController } from "../../controllers/authorization/user.controller";

export class UserRoutes {
    public userController: UserController = new UserController();

    public routes(app: Application): void {

        // ================== RUTAS SIN AUTENTICACIÓN ==================
        app.route("/api/users").get(this.userController.getAllUsers); // Get all users
        app.route("/api/users").post(this.userController.getAllUsers);


        

    }
}        