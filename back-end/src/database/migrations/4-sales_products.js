module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('salesProducts', {
      saleId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'sale_id',
        references: {
          model: 'sales',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'product_id',
        references: {
          model: 'products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('saleProducts');
  },
};
