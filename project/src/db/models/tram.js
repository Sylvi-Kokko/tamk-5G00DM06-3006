module.exports = (sequelize, DataTypes) => {
  const Tram = sequelize.define('tram', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    numberOfCars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 3
      }
    },
    lineId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nextStopId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    indexes: [
      { fields: ['lineId'] },
      { fields: ['id'] },
      { fields: ['nextStopId'] }
    ]
  })

  return Tram
}
