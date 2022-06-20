module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productCategory_id: {
        type: dataTypes.INTEGER,
      },
      productCategory_id: {
        type: dataTypes.INTEGER,
      },
      productName: {
        type: dataTypes.STRING,
      },
      price: {
        type: dataTypes.FLOAT,
      },
      minBuy: {
        type: dataTypes.INTEGER,
      },
      productImages: {
        type: dataTypes.STRING,
      },
      brand_id: {
        type: dataTypes.INTEGER,
      }
   };
    let config = {
        tableName: "users",
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config)

    return Product;
}