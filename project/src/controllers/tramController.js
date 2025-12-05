const { Tram, Line, Stop } = require('../db')
const { validateString, validateInteger } = require('../middleware/dataValidator')
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
      const idCheck = validateInteger(req.body.id)
      if (!idCheck.valid) return res.status(400).json({ message: 'id must be an integer' })
      const existing = await Tram.findByPk(req.body.id)
      if (existing != null) return res.status(409).json({ message: 'id already in use' })
      const nameCheck = validateString(req.body.name)
      if (!nameCheck.valid) return res.status(400).json({ message: nameCheck.message })

      const carsCheck = validateInteger(Number(req.body.numberOfCars), { min: 3 })
      if (!carsCheck.valid) return res.status(400).json({ message: 'numberOfCars must be an integer >= 3' })

      const lineIdCheck = validateInteger(req.body.lineId)
      if (!lineIdCheck.valid) return res.status(400).json({ message: 'lineId must be an integer' })
      const line = await Line.findByPk(lineIdCheck.value)
      if (!line) return res.status(404).json({ message: 'Referenced line not found' })

      if (typeof req.body.nextStopId !== 'undefined' && req.body.nextStopId !== null) {
        const nextStopCheck = validateInteger(Number(req.body.nextStopId))
        if (!nextStopCheck.valid) return res.status(400).json({ message: 'nextStopId must be an integer' })
        const stop = await Stop.findByPk(nextStopCheck.value)
        if (!stop) return res.status(404).json({ message: 'Referenced nextStop not found' })
      }
      const tram = await Tram.create(req.body)
      res.status(201).json(tram)
    } catch (err) { next(err) }
  },

  async update (req, res, next) {
    try {
      const idNum = Number(req.params.id)
      const idCheck = validateInteger(idNum)
      if (!idCheck.valid) return res.status(400).json({ message: 'id must be an integer' })
      const existing = await Tram.findByPk(req.body.id)
      if (existing === null) return res.status(404).json({ message: 'id not found' })
      if (typeof req.body.name !== 'undefined') {
        const nameCheck = validateString(req.body.name)
        if (!nameCheck.valid) return res.status(400).json({ message: nameCheck.message })
      }

      if (typeof req.body.numberOfCars !== 'undefined') {
        const carsCheck = validateInteger(Number(req.body.numberOfCars), { min: 3 })
        if (!carsCheck.valid) return res.status(400).json({ message: 'numberOfCars must be an integer >= 3' })
        req.body.numberOfCars = carsCheck.value
      }

      if (typeof req.body.lineId !== 'undefined') {
        const lineIdCheck = validateInteger(Number(req.body.lineId))
        if (!lineIdCheck.valid) return res.status(400).json({ message: 'lineId must be an integer' })
        const line = await Line.findByPk(lineIdCheck.value)
        if (!line) return res.status(404).json({ message: 'Referenced line not found' })
        req.body.lineId = lineIdCheck.value
      }

      if (typeof req.body.nextStopId !== 'undefined') {
        if (req.body.nextStopId === null) {
        } else {
          const nextStopCheck = validateInteger(Number(req.body.nextStopId))
          if (!nextStopCheck.valid) return res.status(400).json({ message: 'nextStopId must be an integer or null' })
          const stop = await Stop.findByPk(nextStopCheck.value)
          if (!stop) return res.status(404).json({ message: 'Referenced nextStop not found' })
          req.body.nextStopId = nextStopCheck.value
        }
      }
      await Tram.update(req.body, { where: { id: req.params.id } })
      res.json({ message: 'Updated' })
    } catch (err) { next(err) }
  },

  async getOne (req, res, next) {
    try {
       const idNum = Number(req.params.id)
      const idCheck = validateInteger(idNum)
      if (!idCheck.valid) return res.status(400).json({ message: 'id must be an integer' })

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
      const idNum = Number(req.params.id)
      const idCheck = validateInteger(idNum)
      if (!idCheck.valid) return res.status(400).json({ message: 'id must be an integer' })
      const existing = await Tram.findByPk(req.body.id)
      if (existing === null) return res.status(404).json({ message: 'id not found' })
      await Tram.destroy({ where: { id: req.params.id } })
      res.json({ message: 'Deleted' })
    } catch (err) { next(err) }
  },

  async search (req, res, next) {
    try {
      const { name, lineId, minCars, maxCars, nextStopId } = req.query

      const where = {}

      if (typeof name !== 'undefined') {
        const nameCheck = validateString(name)
        if (!nameCheck.valid) return res.status(400).json({ message: nameCheck.message })
        where.name = { [Op.like]: `%${name}%` }
      }

      if (typeof lineId !== 'undefined') {
        const lineIdCheck = validateInteger(Number(lineId))
        if (!lineIdCheck.valid) return res.status(400).json({ message: 'lineId must be an integer' })
        where.lineId = lineIdCheck.value
      }

      if (typeof minCars !== 'undefined' || typeof maxCars !== 'undefined') {
        const range = {}
        if (typeof minCars !== 'undefined') {
          const minCheck = validateInteger(Number(minCars), { min: 3 })
          if (!minCheck.valid) return res.status(400).json({ message: 'minCars must be an integer >= 3' })
          range[Op.gte] = minCheck.value
        }
        if (typeof maxCars !== 'undefined') {
          const maxCheck = validateInteger(Number(maxCars), { min: 3 })
          if (!maxCheck.valid) return res.status(400).json({ message: 'maxCars must be an integer >= 3' })
          range[Op.lte] = maxCheck.value
        }
        where.numberOfCars = range
      }

      if (typeof nextStopId !== 'undefined') {
        const nextStopCheck = validateInteger(Number(nextStopId))
        if (!nextStopCheck.valid) return res.status(400).json({ message: 'nextStopId must be an integer' })
        where.nextStopId = nextStopCheck.value
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
