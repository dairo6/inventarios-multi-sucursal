import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Warehouse } from "./warehouse";

export class Location extends Model {
  public id!: number;
  public warehouseId!: number;
  public code!: string;
  public description?: string;
  public status!: "AVAILABLE" | "OCCUPIED" | "BLOCKED";
}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    warehouseId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("AVAILABLE", "OCCUPIED", "BLOCKED"),
      allowNull: false,
      defaultValue: "AVAILABLE",
    },
  },
  {
    sequelize,
    modelName: "Location",
    tableName: "locations",
    timestamps: false,
  }
);
// Location pertenece a un Warehouse
Location.belongsTo(Warehouse, { foreignKey: "warehouseId", as: "warehouse" });