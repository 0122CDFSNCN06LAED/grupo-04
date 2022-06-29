module.exports = (sequelize, dataTypes) => {
    let alias = "Orders";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total: {
            type: dataTypes.FLOAT,

        },
        orderDate: {
            type: dataTypes.DATE,

        },
        buyDetail_id: {
            type: dataTypes.STRING,
        },
        user_id: {
            type: dataTypes.STRING,
        }
    };
    let config = {
        tableName: "orders",
        timestamps: false
    }

    const Orders = sequelize.define(alias, cols, config)

    Orders.associate = function(models) {
        Orders.belongsTo(models.User, {
            as: "orderUser",
            foreignKey: "user_id",
        });

        Orders.hasMany(models.buyDetail, {
            as: "order_buyDetail",
            foreignKey: "buyDetail_id",
        });

    }


    return Orders;
}