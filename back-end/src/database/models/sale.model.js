const saleSchema = (sequelize, DataTypes) => {
  const saleTable = sequelize.define('Sale', {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  }, {
    tableName: 'sales',
    underscored: true,
    timestamps: false,
  });

  saleTable.associate = (models) => {
    saleTable.belongsTo(models.User, {
      foreignKey: 'seller_id',
      as: 'seller',
    });

    saleTable.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'customer',
    });
  };

  return saleTable;
};

module.exports = saleSchema;
