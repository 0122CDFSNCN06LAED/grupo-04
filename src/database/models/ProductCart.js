module.exports = (sequelize, dataTypes) => {
    let alias = "ProductCart";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id: {
            type: dataTypes.INTEGER,
        },
        quantity: {
            type: dataTypes.INTEGER,
        },
        user_id: {
            type: dataTypes.INTEGER,
        }
    };
    let config = {
        tableName: "productCart",
        timestamps: false,
    };

    const productCart = sequelize.define(alias, cols, config);
    productCart.associate = function(models) {
        ProductCart.hasMany(models.product, {
            as: "productCart",
            foreignKey: "product_id",

        });
        productCart.hasMany(models.users, {
            as: "productCartUsers",
            foreignKey: "user_id",

        });
    }
    return productCart;
}