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
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl} Please check the API documentation for available endpoints.`
  })
})

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      ok: false,
      error: "Invalid JSON format",
      message: err.message
    });
  }
  next(err);
});

sequelize.sync().then(() => {
  console.log('Database synced')
  app.listen(3000, () => console.log('Server running on http://localhost:3000'))
})
