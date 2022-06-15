module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userName: {
        type: dataTypes.STRING,
      },
      firstName: {
        type: dataTypes.STRING,
      },
      email: {
        type: dataTypes.STRING,
      },
      cuit: {
        type: dataTypes.INTEGER,
      },
      companyName: {
        type: dataTypes.STRING,
      },
      phoneNumber: {
        type: dataTypes.INTEGER,
      },
      password: {
        type: dataTypes.STRING,
      },
      companyImg: {
        type: dataTypes.STRING,
      },
      usercategory_id: {
        type: dataTypes.STRING,
      }
    };
    let config = {
        tableName: "users",
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config)

    return User;
}