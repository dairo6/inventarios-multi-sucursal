import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { Branch  } from "./branch";
import { Product } from "./product";

export class StockBranch extends Model {
  public id!: number;
  public branchId!: number;
  public productId!: number;
  public quantity!: number;
  public minStock!: number;
  public maxStock!: number;
  public status!: "ACTIVE" | "INACTIVE";
  public readonly updatedAt!: Date;
}

StockBranch.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    branchId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Branch,
        key: "id",
      },
    },
    productId: {
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
    createdAt: false, // solo updatedAt
  }
);

// 🔗 Relaciones
StockBranch.belongsTo(Branch, { foreignKey: "branchId", as: "branch" });
Branch.hasMany(StockBranch, { foreignKey: "branchId", as: "stock" });

StockBranch.belongsTo(Product, { foreignKey: "productId", as: "product" });
Product.hasMany(StockBranch, { foreignKey: "productId", as: "stock" });
