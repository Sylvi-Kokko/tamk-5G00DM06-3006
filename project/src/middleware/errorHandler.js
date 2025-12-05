module.exports = (err, res) => {
  console.error(err)
  res.status(400).json({ error: err.message })
}
