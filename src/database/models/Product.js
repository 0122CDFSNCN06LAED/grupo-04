module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        models_id: {
            type: dataTypes.INTEGER,
        },
        category_id: {
            type: dataTypes.INTEGER,
        }

    };

    let config = {
        tableName: "products",
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsTo(models.ProductCategories, {
            as: "categories",
            foreignKey: "category_id"
        });
        Product.belongsTo(models.Models, {
            as: "modelosDeProducto",
            foreignKey: "models_id",
        });
        Product.belongsToMany(models.Users, {
            as: "productosFavoritos",
            through: "favoriteProducts",
            foreignKey: "product_id",
            otherKey: "user_id",
            timestamps: false,
        });
        Product.hasMany(models.BuyDetail, {
            as: "detalleCompra_producto",
            foreignKey: "product_id",

        });

    };

    return Product;
}