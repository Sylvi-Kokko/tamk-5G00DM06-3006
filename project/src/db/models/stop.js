module.exports = (sequelize, DataTypes) => {
  const Stop = sequelize.define('Stop', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    }
  }, {
    indexes: [
      { fields: ['id'] }
    ]
  })

  return Stop
}
