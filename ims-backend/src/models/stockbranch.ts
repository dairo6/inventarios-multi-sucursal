import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { Branch } from "./branch";
import { Product } from "./product";

// 🟢 Interfaz para tipado en TypeScript
export interface StockBranchI {
  id?: number;
  branch_id: number;
  product_id: number;
  quantity: number;
  minStock: number;
  maxStock: number;
  status: "ACTIVE" | "INACTIVE";
  updatedAt?: Date;
}

// 🟣 Clase del modelo Sequelize
export class StockBranch extends Model {
  public id!: number;
  public branch_id!: number;
  public product_id!: number;
  public quantity!: number;
  public minStock!: number;
  public maxStock!: number;
  public status!: "ACTIVE" | "INACTIVE";
  public readonly updatedAt!: Date;
}

// ⚙️ Inicialización del modelo
StockBranch.init(
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
    },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    minStock: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    maxStock: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "StockBranch",
    tableName: "stock_branches",
    createdAt: false, // Solo mantiene updatedAt
  }
);

// 🔗 Relaciones 1:N
Branch.hasMany(StockBranch, {
  foreignKey: "branch_id",
  sourceKey: "id",
});

StockBranch.belongsTo(Branch, {
  foreignKey: "branch_id",
  targetKey: "id",
});

Product.hasMany(StockBranch, {
  foreignKey: "product_id",
  sourceKey: "id",
});

StockBranch.belongsTo(Product, {
  foreignKey: "product_id",
  targetKey: "id",
});
