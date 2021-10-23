function errorHandlerPokemon(err, req, res, next) {
  if (!err.status) {
    res.status = 500
    res.send(err)
  }
  res.status(err.status)
  res.send(err.message)
}

module.exports = errorHandlerPokemon
