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

    productCategories.associate = function(models) {
        productCategories.hasMany(models.ProductsSubCategories, {
            as: "cateogriaProductos_subCategorias",
            foreignKey: "productCategory_id",

        })
    };

    return productCategories;
}