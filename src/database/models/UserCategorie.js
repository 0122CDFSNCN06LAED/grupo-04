module.exports = (sequelize, dataTypes) => {
    let alias = "UserCategories";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
      },
      type: {
        type: dataTypes.STRING,
      }    };
    let config = {
      tableName: "usersuserCategories",
      timestamps: false,
    };

    const UserCategirie = sequelize.define(alias, cols, config)

    return UserCategirie;
}