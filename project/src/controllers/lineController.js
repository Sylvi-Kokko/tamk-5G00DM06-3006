const { Line, Stop, LineStop, sequelize } = require('../db')
const { validateString, validateInteger } = require('../middleware/dataValidator')
const { Op } = require('sequelize')

module.exports = {

  async getAll (req, res, next) {
    try {
      const lines = await Line.findAll({
        include: [
          {
            model: Stop,
            as: 'stops',
            through: { attributes: [] }
          }
        ],
        order: [
          [{ model: Stop, as: 'stops' }, LineStop, 'order', 'ASC']
        ]
      })

      res.json(lines)
    } catch (err) { next(err) }
  },

  async create (req, res, next) {
    try {
      const idCheck = validateInteger(req.body.id)
      if (!idCheck.valid) return res.status(400).json({ message: 'id must be an integer' })
      const existing = await Line.findByPk(req.body.id)
      if (existing != null) return res.status(409).json({ message: 'id already in use' })
      const { stops, ...lineData } = req.body

      const nameCheck = validateString(lineData.name)
      if (!nameCheck.valid) return res.status(400).json({ message: nameCheck.message })

      if (Array.isArray(stops)) {
        for (const it of stops) {
          if (typeof it.stopId === 'undefined' || typeof it.order === 'undefined') {
            return res.status(400).json({ message: 'Each stops item must include stopId and order' })
          }
          if (!Number.isInteger(it.order) || it.order < 0) {
            return res.status(400).json({ message: 'order must be a non-negative integer' })
          }
        }

        const stopIds = [...new Set(stops.map(s => s.stopId))]
        const existing = await Stop.findAll({ where: { id: stopIds } })
        if (existing.length !== stopIds.length) {
          return res.status(404).json({ message: 'One or more stops not found' })
        }
      }

      const line = await sequelize.transaction(async (t) => {
        const createdLine = await Line.create(lineData, { transaction: t })

        if (Array.isArray(stops) && stops.length) {
          const rows = stops.map(s => ({
            lineId: createdLine.id,
            stopId: s.stopId,
            order: s.order
          }))
          await LineStop.bulkCreate(rows, { transaction: t })
        }

        return createdLine
      })

      const result = await Line.findByPk(line.id, {
        include: [{ model: Stop, as: 'stops', through: { attributes: [] } }],
        order: [[{ model: Stop, as: 'stops' }, LineStop, 'order', 'ASC']]
      })

      res.status(201).json(result)
    } catch (err) { next(err) }
  },

  async getOne (req, res, next) {
    try {
      const idNum = Number(req.params.id)
      const idCheck = validateInteger(idNum)
      if (!idCheck.valid) return res.status(400).json({ message: 'id must be an integer' })

      const line = await Line.findByPk(req.params.id)
      if (!line) return res.status(404).json({ message: 'Line not found' })
      res.json(line)
    } catch (err) { next(err) }
  },

  async update (req, res, next) {
    try {
      const idNum = Number(req.params.id)
      const idCheck = validateInteger(idNum)
      if (!idCheck.valid) return res.status(400).json({ message: 'id must be an integer' })
      const existing = await Line.findByPk(req.params.id)
      if (existing === null) return res.status(404).json({ message: 'id not found' })
      if (typeof req.body.name !== 'undefined') {
        const nameCheck = validateString(req.body.name)
        if (!nameCheck.valid) return res.status(400).json({ message: nameCheck.message })
      }
      const id = req.params.id

      if (Array.isArray(req.body.stops)) {
        const items = req.body.stops

        for (const it of items) {
          if (typeof it.stopId === 'undefined' || typeof it.order === 'undefined') {
            return res.status(400).json({ message: 'Each linestops item must include stopId and order' })
          }
          if (!Number.isInteger(it.order) || it.order < 0) {
            return res.status(400).json({ message: 'order must be a non-negative integer' })
          }
        }

        await sequelize.transaction(async (t) => {
          await Promise.all(items.map(async (it) => {
            const [affected] = await LineStop.update(
              { order: it.order },
              { where: { lineId: id, stopId: it.stopId }, transaction: t }
            )
            if (affected === 0) {
              await LineStop.create({ lineId: id, stopId: it.stopId, order: it.order }, { transaction: t })
            }
          }))
        })

        return res.json({ message: 'Line stops order updated' })
      }

      await Line.update(req.body, { where: { id } })
      res.json({ message: 'Updated' })
    } catch (err) { next(err) }
  },

  async remove (req, res, next) {
    try {
      const idNum = Number(req.params.id)
      const idCheck = validateInteger(idNum)
      if (!idCheck.valid) return res.status(400).json({ message: 'id must be an integer' })
      const existing = await Line.findByPk(req.body.id)
      if (existing === null) return res.status(404).json({ message: 'id not found' })
      await Line.destroy({ where: { id: req.params.id } })
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

      const lines = await Line.findAll({
        where,
        include: [
          { model: Stop, as: 'stops' }
        ]
      })

      res.json(lines)
    } catch (err) {
      next(err)
    }
  }
}
