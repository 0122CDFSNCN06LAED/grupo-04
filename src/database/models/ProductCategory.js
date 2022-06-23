module.exports = (sequelize, dataTypes) => {
    let alias = "ProductCategories";
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
      }
    };
    let config = {
      tableName: "productCategories",
      timestamps: false,
    };

    const productCategories = sequelize.define(alias, cols, config);

    productCategories.associate = function (models) {
      productCategories.belongsToMany(models.Products, {
        as: "Products",
        through: "products_productCategories",
        otherKey: "product_id",
        foreignKey: "productCategories_id",
        timestamps: false,
      });
    };

    return productCategories;
}