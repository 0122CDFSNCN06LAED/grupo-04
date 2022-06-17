module.exports = (sequelize, dataTypes) => {
    let alias = "Brands";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: dataTypes.STRING,
      }
    };
    let config = {
      tableName: "brands",
      timestamps: false,
    };

    const brands = sequelize.define(alias, cols, config);

    return brands;
}