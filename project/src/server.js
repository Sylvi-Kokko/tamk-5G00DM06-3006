const express = require('express')
const { sequelize } = require('./db')
const tramRoutes = require('./routes/tramRoutes')
const stopRoutes = require('./routes/stopRoutes')
const lineRoutes = require('./routes/lineRoutes')
const errorHandler = require('./middleware/errorHandler')

const app = express()
app.use(express.json())

app.use('/trams', tramRoutes)
app.use('/stops', stopRoutes)
app.use('/lines', lineRoutes)

app.use(errorHandler)

sequelize.sync().then(() => {
  console.log('Database synced')
  app.listen(3000, () => console.log('Server running on http://localhost:3000'))
})
