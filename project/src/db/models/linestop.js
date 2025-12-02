module.exports = (sequelize, DataTypes) => {
  const LineStop = sequelize.define('LineStop', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    lineId: { type: DataTypes.INTEGER, allowNull: false },
    stopId: { type: DataTypes.INTEGER, allowNull: false },
    order: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } }
  }, {
    indexes: [
      { fields: ['lineId'] },
      { fields: ['stopId'] }
    ]
  })

  return LineStop
}
