import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import { sequelize } from "../database/connection";
import { Routes } from "../routes/index";

/// Load environment variables from the .env file
dotenv.config();

export class App {
  public app: Application;
  public routePrv: Routes = new Routes();

  constructor(private port?: number | string) {
    this.app = express();

    this.settings();
    this.middlewares();
    this.routes();
    this.dbConnection(); // Call the database connection method
  }

  // Application settings
  private settings(): void {
    this.app.set('port', this.port || process.env.PORT || 4000);
  }

  // Middleware configuration
  private middlewares(): void {
    this.app.use(morgan('dev'));
 //   this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  // Route configuration: Definicion de rutas de los modelos
  private routes(): void {
     this.routePrv.productRoutes.routes(this.app);
      this.routePrv.branchRoutes.routes(this.app);
      this.routePrv.categoryRoutes.routes(this.app);
      this.routePrv.guaranteeRoutes.routes(this.app);
      this.routePrv.inventoryMovementRoutes.routes(this.app);
      this.routePrv.locationRoutes.routes(this.app);
      this.routePrv.lotRoutes.routes(this.app);
      this.routePrv.stockBranchRoutes.routes(this.app);
      this.routePrv.supplierRoutes.routes(this.app);
      this.routePrv.warehouseRoutes.routes(this.app);
      
  }

  // Method to connect and synchronize the database
  private async dbConnection(): Promise<void> {
    try {
      await sequelize.sync({ force: true }); // Synchronize the database
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  // Start the server
  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log('Server on port', this.app.get('port'));
  }
}