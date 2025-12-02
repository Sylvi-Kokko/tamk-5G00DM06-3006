const { LineStop, Line, Stop } = require('../db')

module.exports = {
  async getAll (req, res, next) {
    try {
      const where = {}
      if (req.query.lineId) where.lineId = req.query.lineId
      if (req.query.stopId) where.stopId = req.query.stopId

      const lineStops = await LineStop.findAll({
        where,
        include: [
          { model: Line },
          { model: Stop }
        ],
        order: [['order', 'ASC']]
      })
      res.json(lineStops)
    } catch (err) { next(err) }
  },

  async create (req, res, next) {
    try {
      const { lineId, stopId, order } = req.body
      if (!lineId || !stopId || typeof order === 'undefined') {
        return res.status(400).json({ message: 'lineId, stopId and order are required' })
      }

      const line = await Line.findByPk(lineId)
      if (!line) return res.status(404).json({ message: 'Line not found' })

      const stop = await Stop.findByPk(stopId)
      if (!stop) return res.status(404).json({ message: 'Stop not found' })

      const conflictSeq = await LineStop.findOne({ where: { lineId, order } })
      if (conflictSeq) {
        return res.status(409).json({ message: 'order already used for this line' })
      }
      const conflictStop = await LineStop.findOne({ where: { lineId, stopId } })
      if (conflictStop) {
        return res.status(409).json({ message: 'Stop already assigned to this line' })
      }

      const created = await LineStop.create({ lineId, stopId, order })
      res.status(201).json(created)
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ message: 'Duplicate order or stop for this line' })
      }
      next(err)
    }
  },

  async update (req, res, next) {
    try {
      await LineStop.update(req.body, { where: { id: req.params.id } })
      res.json({ message: 'Updated' })
    } catch (err) { next(err) }
  },

  async remove (req, res, next) {
    try {
      await LineStop.destroy({ where: { id: req.params.id } })
      res.json({ message: 'Deleted' })
    } catch (err) { next(err) }
  }
}