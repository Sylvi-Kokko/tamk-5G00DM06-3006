module.exports = (sequelize, DataTypes) => {
  const Line = sequelize.define('Line', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    }
  }, {
    indexes: [
      { fields: ['id'] },
      { fields: ['name'] }
    ]
  })

  return Line
}
