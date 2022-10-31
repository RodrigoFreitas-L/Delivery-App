const userSchema = (sequelize, DataTypes) => {
  const userTable = sequelize.define('User', {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: false,
  });

  // userTable.associate = (models) => {
  //   userTable.belongsTo(models.Sale, {
  //     foreignKey: 'user_id',
  //     as: 'users',
  //   });
  // };

  return userTable;
};

module.exports = userSchema;
