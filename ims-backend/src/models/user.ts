import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";

export interface UserI {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: "ADMIN" | "MANAGER" | "EMPLOYEE";
  status: "ACTIVE" | "INACTIVE";
}

export class User extends Model implements UserI {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: "ADMIN" | "MANAGER" | "EMPLOYEE";
  public status!: "ACTIVE" | "INACTIVE";
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("ADMIN", "MANAGER", "EMPLOYEE"),
      allowNull: false,
      defaultValue: "EMPLOYEE",
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);
