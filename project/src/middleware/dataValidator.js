function validateString (value) {
  if (typeof value === 'undefined') {
    return { valid: false, message: 'String is required' }
  }
  if (value === null) {
    return { valid: false, message: 'String must not be null' }
  }
  if (typeof value !== 'string') {
    return { valid: false, message: 'value must be a string' }
  }
  return { valid: true }
}

function validateInteger (value, options = {}) {
  const { nullable = false, min, max } = options
  if (value === null) {
    return nullable ? { valid: true } : { valid: false, message: 'value must not be null' }
  }

  const intVal = value
  if (!Number.isInteger(value)) return { valid: false, message: 'value must be an integer' }
  if (typeof min === 'number' && intVal < min) return { valid: false, message: `value must be >= ${min}` }
  if (typeof max === 'number' && intVal > max) return { valid: false, message: `value must be <= ${max}` }
  return { valid: true, value: intVal }
}

module.exports = {
  validateString,
  validateInteger
}
