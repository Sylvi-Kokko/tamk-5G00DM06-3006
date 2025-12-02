const { Stop, Line } = require('../db')
const { Op } = require('sequelize')

module.exports = {
  async getAll (req, res, next) {
    try {
      const stops = await Stop.findAll({
        include: [{ model: Line, as: 'lines' }]
      })
      res.json(stops)
    } catch (err) { next(err) }
  },

  async create (req, res, next) {
    try {
      const stop = await Stop.create(req.body)
      res.status(201).json(stop)
    } catch (err) { next(err) }
  },

  async update (req, res, next) {
    try {
      await Stop.update(req.body, { where: { id: req.params.id } })
      res.json({ message: 'Updated' })
    } catch (err) { next(err) }
  },

  async remove (req, res, next) {
    try {
      await Stop.destroy({ where: { id: req.params.id } })
      res.json({ message: 'Deleted' })
    } catch (err) { next(err) }
  },

  async search (req, res, next) {
    try {
      const { name } = req.query

      const where = {}

      if (name) {
        where.name = { [Op.like]: `%${name}%` }
      }

      const stops = await Stop.findAll({
        where,
        include: [
          { model: Stop }
        ]
      })

      res.json(stops)
    } catch (err) {
      next(err)
    }
  }
}
