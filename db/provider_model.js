'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      provider.belongsTo(models.vendors, {
        foreignKey: 'vendor_id',
      })
    }
  }
  provider.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      vendor_id: DataTypes.UUID,
      meta: DataTypes.JSONB,
    },
    {
      sequelize,
      modelName: 'provider',
    }
  )
  return provider
}
