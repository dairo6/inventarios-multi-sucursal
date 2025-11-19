import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { Warehouse } from "./warehouse";

export interface LocationI {
  id?: number;
  warehouse_id: number;
  code: string;
  description?: string;
  status: "AVAILABLE" | "OCCUPIED" | "BLOCKED";
}

export class Location extends Model  {
  public id!: number;
  public warehouse_id!: number;
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
    warehouse_id: {
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

// 🔗 Relaciones
Warehouse.hasMany(Location, {
  foreignKey: "warehouse_id",
  sourceKey: "id",
  as: "location"
});

Location.belongsTo(Warehouse, {
  foreignKey: "warehouse_id",
  targetKey: "id",
  as: "warehouse"
});
