import mongoose from "mongoose";

const MOCK_PRODUCTS = [
  {
    // ID: new mongoose.Types.ObjectId().toHexString(),
    Name: "Bread",
    UnitPrice: 2.99,
  },
  {
    // ID: new mongoose.Types.ObjectId().toHexString(),
    Name: "Milk",
    UnitPrice: 1.99,
  },
  {
    // ID: new mongoose.Types.ObjectId().toHexString(),
    Name: "Eggs",
    UnitPrice: 2.49,
  },
  {
    // ID: new mongoose.Types.ObjectId().toHexString(),
    Name: "Rice",
    UnitPrice: 3.99,
  },
  {
    // ID: new mongoose.Types.ObjectId().toHexString(),
    Name: "Water",
    UnitPrice: 0.99,
  },
  {
    // ID: new mongoose.Types.ObjectId().toHexString(),
    Name: "Toilet Paper",
    UnitPrice: 4.49,
  },
  {
    // ID: new mongoose.Types.ObjectId().toHexString(),
    Name: "Soap",
    UnitPrice: 1.79,
  },
  {
    // ID: new mongoose.Types.ObjectId().toHexString(),
    Name: "Canned Beans",
    UnitPrice: 1.29,
  },
  {
    // ID: new mongoose.Types.ObjectId().toHexString(),
    Name: "Diapers",
    UnitPrice: 8.99,
  },
  {
    // ID: new mongoose.Types.ObjectId().toHexString(),
    Name: "Salt",
    UnitPrice: 0.79,
  },
];
export default MOCK_PRODUCTS;
