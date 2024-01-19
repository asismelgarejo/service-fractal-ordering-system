import { DataTypes, Model, Sequelize } from "sequelize";

class OrderSchema extends Model {
  static associate() {}
}

export default function GetSchema(sequelize: Sequelize) {
  OrderSchema.init(
    {
      Date: {
        type: DataTypes.DATEONLY,
      },
      OrderCode: {
        type: DataTypes.STRING,
      },
      FinalPrice: {
        type: DataTypes.DECIMAL(10, 2),
      },
      Status: {
        type: DataTypes.ENUM("Pending", "Completed", "InProgress"),
      },
    },
    { sequelize, modelName: "Order" }
  );

  return OrderSchema;
}
