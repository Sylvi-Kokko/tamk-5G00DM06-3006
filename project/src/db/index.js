const sequelize = require('./sequelize')
const { DataTypes } = require('sequelize')

const Tram = require('./models/tram')(sequelize, DataTypes)
const Stop = require('./models/stop')(sequelize, DataTypes)
const Line = require('./models/line')(sequelize, DataTypes)
const LineStop = require('./models/linestop')(sequelize, DataTypes)

Line.hasMany(Tram, { foreignKey: 'lineId' })
Tram.belongsTo(Line, { foreignKey: 'lineId' })

Tram.belongsTo(Stop, { foreignKey: 'nextStopId', as: 'nextStop' })

Line.belongsToMany(Stop, {
  through: LineStop,
  foreignKey: 'lineId',
  otherKey: 'stopId',
  as: 'stops'
})
Stop.belongsToMany(Line, {
  through: LineStop,
  foreignKey: 'stopId',
  otherKey: 'lineId',
  as: 'lines'
})

LineStop.associate = (models) => {
  LineStop.belongsTo(models.Line, { foreignKey: 'lineId', onDelete: 'CASCADE' })
  LineStop.belongsTo(models.Stop, { foreignKey: 'stopId', onDelete: 'CASCADE' })
}

module.exports = { sequelize, Tram, Stop, Line, LineStop }
