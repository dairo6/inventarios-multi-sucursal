import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { Branch } from "./branch";

// 🟢 Interfaz TypeScript
export interface WarehouseI {
  id?: number;
  branch_id: number;
  name: string;
  code: string;
  description?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: Date;
  updatedAt?: Date;
}

// 🟣 Clase del modelo Sequelize
export class Warehouse extends Model {
  public id!: number;
  public branch_id!: number;
  public name!: string;
  public code!: string;
  public description?: string;
  public status!: "ACTIVE" | "INACTIVE";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// ⚙️ Inicialización del modelo
Warehouse.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    branch_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Branch,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name cannot be empty" },
      },
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Code cannot be empty" },
      },
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Warehouse",
    tableName: "warehouses",
    timestamps: true, // createdAt y updatedAt
  }
);

// 🔗 Relaciones
Branch.hasMany(Warehouse, {
  foreignKey: "branch_id",
  sourceKey: "id",
  as: "warehouses",
});

Warehouse.belongsTo(Branch, {
  foreignKey: "branch_id",
  targetKey: "id",
  as: "branch",
});
