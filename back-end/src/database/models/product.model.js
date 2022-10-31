const productSchema = (sequelize, DataTypes) => {
  const productTable = sequelize.define('Product', {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    urlImage: DataTypes.STRING,
  }, {
    tableName: 'products',
    underscored: true,
    timestamps: false,
  });

  return productTable;
};

module.exports = productSchema;
