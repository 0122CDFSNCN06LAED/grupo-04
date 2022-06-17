module.exports = (sequelize, dataTypes) => {
    let alias = "ProductsSubCategories";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: dataTypes.STRING,
      },
      description: {
        type: dataTypes.STRING,
      },
      productCategory_id: {
        type: dataTypes.INTEGER,
      },
    };
    let config = {
      tableName: "productSubCategories",
      timestamps: false,
    };

    const productSubCategories = sequelize.define(alias, cols, config);

    return productSubCategories;
}