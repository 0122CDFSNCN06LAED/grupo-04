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
            foreignKey: true,
        },
    };
    let config = {
        tableName: "productSubCategories",
        timestamps: false,
    };

    const productSubCategories = sequelize.define(alias, cols, config);

    productSubCategories.associate = function(models) {
        productSubCategories.belongsToMany(models.Products, {
            as: "subcategorias_productos",
            through: "products_productSubCategories",
            foreignKey: "productSubcategories_id",
            otherKey: "product_id",
            timestamps: false,
        });
        productSubCategories.belongsTo(models.ProductCategories, {
            as: "subCategorias_cateogriaProductos",
            foreignKey: "productCategory_id",

        })
    };
    return productSubCategories;
}