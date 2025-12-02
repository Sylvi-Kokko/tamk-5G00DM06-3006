const { Tram, Line, Stop } = require('../db')
const { Op } = require('sequelize')

module.exports = {
  async getAll (req, res, next) {
    try {
      const where = {}

      if (req.query.name) {
        where.name = { [Op.like]: `%${req.query.name}%` }
      }
      if (req.query.lineId) {
        where.lineId = req.query.lineId
      }

      const trams = await Tram.findAll({
        where,
        include: [
          { model: Line },
          { model: Stop, as: 'nextStop' }
        ]
      })
      res.json(trams)
    } catch (err) { next(err) }
  },

  async create (req, res, next) {
    try {
      const tram = await Tram.create(req.body)
      res.status(201).json(tram)
    } catch (err) { next(err) }
  },

  async update (req, res, next) {
    try {
      await Tram.update(req.body, { where: { id: req.params.id } })
      res.json({ message: 'Updated' })
    } catch (err) { next(err) }
  },

  async getOne (req, res, next) {
    try {
      const tram = await Tram.findByPk(req.params.id, {
        include: [
          { model: Line },
          { model: Stop, as: 'nextStop' }
        ]
      })
      if (!tram) return res.status(404).json({ message: 'Tram not found' })
      res.json(tram)
    } catch (err) { next(err) }
  },

  async remove (req, res, next) {
    try {
      await Tram.destroy({ where: { id: req.params.id } })
      res.json({ message: 'Deleted' })
    } catch (err) { next(err) }
  },

  async search (req, res, next) {
    try {
      const { name, lineId, minCars, maxCars, nextStopId } = req.query

      const where = {}

      if (name) {
        where.name = { [Op.like]: `%${name}%` }
      }

      if (lineId) {
        const n = parseInt(lineId, 10)
        if (Number.isNaN(n)) return res.status(400).json({ message: 'lineId must be a number' })
        where.lineId = n
      }

      if (minCars || maxCars) {
        const range = {}
        if (minCars) {
          const n = parseInt(minCars, 10)
          if (Number.isNaN(n)) return res.status(400).json({ message: 'minCars must be a number' })
          range[Op.gte] = n
        }
        if (maxCars) {
          const n = parseInt(maxCars, 10)
          if (Number.isNaN(n)) return res.status(400).json({ message: 'maxCars must be a number' })
          range[Op.lte] = n
        }
        where.numberOfCars = range
      }

      if (nextStopId) {
        const n = parseInt(nextStopId, 10)
        if (Number.isNaN(n)) return res.status(400).json({ message: 'nextStopId must be a number' })
        where.nextStopId = n
      }

      const trams = await Tram.findAll({
        where,
        include: [
          { model: Line },
          { model: Stop, as: 'nextStop' }
        ]
      })

      res.json(trams)
    } catch (err) {
      next(err)
    }
  }

}
