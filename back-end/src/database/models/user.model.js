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

  userTable.associate = (models) => {
    userTable.hasMany(models.Sale, {
      foreignKey: 'user_id',
      as: 'orders',
    });

    userTable.hasMany(models.Sale, {
      foreignKey: 'seller_id',
      as: 'sales',
    });
  };

  return userTable;
};

module.exports = userSchema;
