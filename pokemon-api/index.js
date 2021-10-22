const express = require('express')
const app = express()
const port = 8080
const pokemonRouter = require('./routers/pokemonRouter')
const Pokedex = require('pokedex-promise-v2')
const P = new Pokedex()

//start server listening
app.listen(port, () => console.log('listening on', port))

//route the app
app.get('/', (req, res) => {
  res.send('we got a get request ')
})

// send back pokemon name according to id or name requested
app.use('/pokemon', pokemonRouter)

//send back pokemon name according to id or name requested
// app.get('/:id', (req, res) => {
//   console.log('we got id param')
//   console.log(req.params.id)
//   P.getPokemonByName(req.params.id)
//     .then((pokeres) => {
//       res.send(pokeres.name)
//     })
//     .catch((err) => res.send(err.message))
// })
