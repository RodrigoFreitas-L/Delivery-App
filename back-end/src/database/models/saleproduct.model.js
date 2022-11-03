const saleProductSchema = (sequelize, DataTypes) => {
  const saleProductTable = sequelize.define('SalesProduct', {
    saleId: { primaryKey: true, type: DataTypes.INTEGER },
    productId: { primaryKey: true, type: DataTypes.INTEGER },
    quantity: DataTypes.INTEGER,
  }, {
    tableName: 'salesProducts',
    underscored: true,
    timestamps: false,
  });

  saleProductTable.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      foreignKey: 'sale_id',
      otherKey: 'product_id',
      through: saleProductTable,
      as: 'products',
    });

    models.Product.belongsToMany(models.Sale, {
      foreignKey: 'product_id',
      otherKey: 'sale_id',
      through: saleProductTable,
      as: 'sales',
    });
  };

  return saleProductTable;
};

module.exports = saleProductSchema;
