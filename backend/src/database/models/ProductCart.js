module.exports = (sequelize, dataTypes) => {
    let alias = "ProductCart";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        /* product_id: {
             type: dataTypes.INTEGER,
         },*/
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

    const ProductCar = sequelize.define(alias, cols, config);
    /*  ProductCar.associate = function(models) {
          ProductCar.hasMany(models.Products, {
              as: "productCar",
              foreignKey: "product_id",

          });
          ProductCar.hasMany(models.Users, {
              as: "productCarUsers",
              foreignKey: "user_id",

          });
      }*/
    return ProductCar;
}