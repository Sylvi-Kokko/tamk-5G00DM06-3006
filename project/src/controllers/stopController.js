const { Stop, Line } = require('../db')
const { validateString, validateInteger } = require('../middleware/dataValidator')
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
      const nameCheck = validateString(req.body.name)
      if (!nameCheck.valid) return res.status(400).json({ message: "Name must be a string" })
      const idCheck = validateInteger(req.body.id)
      if (!idCheck.valid) return res.status(400).json({ message: 'id must be an integer' })
      const existing = await Stop.findByPk(req.body.id)
      if (existing != null) return res.status(409).json({ message: 'id already in use' })
      const stop = await Stop.create(req.body)
      res.status(201).json(stop)
    } catch (err) { next(err) }
  },

  async getOne (req, res, next) {
    try {
      const idNum = Number(req.params.id)
      const idCheck = validateInteger(idNum)
      if (!idCheck.valid) return res.status(400).json({ message: 'id must be an integer' })

      const stop = await Stop.findByPk(req.params.id)
      if (!stop) return res.status(404).json({ message: 'Stop not found' })
      res.json(stop)
    } catch (err) { next(err) }
  },

  async update (req, res, next) {
    try {
      const idNum = Number(req.params.id)
      const idCheck = validateInteger(idNum)
      if (!idCheck.valid) return res.status(400).json({ message: 'id must be an integer' })
      const existing = await Stop.findByPk(req.body.id)
      if (existing === null) return res.status(404).json({ message: 'id not found' })
      if (typeof req.body.name !== 'undefined') {
        const nameCheck = validateString(req.body.name)
        if (!nameCheck.valid) return res.status(400).json({ message: nameCheck.message })
      }
      await Stop.update(req.body, { where: { id: req.params.id } })
      res.json({ message: 'Updated' })
    } catch (err) { next(err) }
  },

  async remove (req, res, next) {
    try {
      const idNum = Number(req.params.id)
      const idCheck = validateInteger(idNum)
      if (!idCheck.valid) return res.status(400).json({ message: 'id must be an integer' })
      const existing = await Stop.findByPk(req.body.id)
      if (existing === null) return res.status(404).json({ message: 'id not found' })
      await Stop.destroy({ where: { id: req.params.id } })
      res.json({ message: 'Deleted' })
    } catch (err) { next(err) }
  },

  async search (req, res, next) {
    try {
      const { name } = req.query
      if (typeof name !== 'undefined') {
        const nameCheck = validateString(name)
        if (!nameCheck.valid) return res.status(400).json({ message: nameCheck.message })
      }
      const where = {}

      if (name) {
        where.name = { [Op.like]: `%${name}%` }
      }

      const stops = await Stop.findAll({
        where,
        include: [
          { model: Line, as : 'lines' }
        ]
      })

      res.json(stops)
    } catch (err) {
      next(err)
    }
  }
}
