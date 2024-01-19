import { DBSequelize } from "constants/interfaces";
import { DataTypes, Model, Sequelize } from "sequelize";

class OrderSchema extends Model {
  static associate() {}
}

export default function GetSchema(sequelize: Sequelize) {
  OrderSchema.init(
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        validate: {
          isDate: {
            args: true,
            msg: "Date is invalid",
          },
        },
      },
      Order: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "The order is required",
          },
        },
      },
      FinalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        validate: {
          min: {
            args: [0],
            msg: "The FinalPrice cannot be lower than cero",
          },
        },
      },
      Status: {
        type: DataTypes.ENUM("Pending", "Completed", "InProgress"),
        defaultValue: "Pending",
      },
    },
    { sequelize, modelName: "Order", timestamps: false }
  );

  return new DBSequelize(OrderSchema);
}
