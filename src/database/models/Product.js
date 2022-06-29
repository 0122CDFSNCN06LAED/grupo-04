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

    Product.associate = function(models) {
        Product.belongsToMany(models.ProductsSubCategories, {
            as: "productos_subcategorias",
            through: "products_productSubCategories",
            foreignKey: "product_id",
            otherKey: "productSubCategories_id",
            timestamps: false,
        });
        Product.belongsTo(models.Models, {
            as: "modelosDeProducto",
            foreignKey: "model_id",
        });
        Product.hasMany(models.Users, {
            as: "productosFavoritos",
            through: "favoriteproducts",
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