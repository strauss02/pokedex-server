const cors = require('cors')
const express = require('express')
const app = express()
const port = 8080
const userRouter = require('./routers/userRouter')
const userHandler = require('./middleware/userHandler')
const pokemonRouter = require('./routers/pokemonRouter')
const errorHandler = require('./middleware/errorHandler')
const Pokedex = require('pokedex-promise-v2')
const P = new Pokedex()
app.use(cors())
// app.use(test)

// function test(req, res, next) {
//   console.log('test')
//   next()
// }

//start server listening
app.listen(port, () => console.log('listening on', port))

//route the app
app.get('/', (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*')
  res.send('we got a get request ')
})

// send back pokemon name according to id or name requested
app.use('/pokemon', userHandler, pokemonRouter)
app.use('/info', userRouter)
app.use(errorHandler)

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
