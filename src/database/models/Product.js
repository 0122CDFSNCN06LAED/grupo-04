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
        tableName: "products",
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
      Product.belongsToMany(models.ProductCategories, {
        as: "ProductCategories",
        through: "products_productCategories",
        foreignKey: "product_id",
        otherKey: "productCategories_id",
        timestamps: false,
      })};

    return Product;
}