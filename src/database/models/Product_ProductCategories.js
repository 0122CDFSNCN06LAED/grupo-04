module.exports = (sequelize, dataTypes) => {
    let alias = "Products_ProductCategories";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: dataTypes.INTEGER,
      },
      productCategories_id: {
        type: dataTypes.INTEGER,
      },
    };
    let config = {
      tableName: "products_productCategories",
      timestamps: false,
    };

    const Products_ProductCategories = sequelize.define(alias, cols, config);

    return Products_ProductCategories;
}