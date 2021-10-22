const { response } = require('express')
const express = require('express')
const router = express.Router()
const Pokedex = require('pokedex-promise-v2')
const P = new Pokedex()

router.get('/', (req, res) => {
  res.send({
    user: {
      id: 1,
      name: 'ScaleUp Velocity',
    },
  })
})

router.get('/get/:id', (req, res) => {
  console.log('we got id param')
  console.log(req.params.id)
  P.getPokemonByName(req.params.id)
    .then((pokeres) => {
      const pokeObject = getPokemonObj(pokeres)
      res.send(pokeObject)
    })
    .catch((err) => res.send(err.message))
})

// // Local host:8080/Pokemon/query?name=pikachu

router.get('/query', (req, res) => {
  console.log('we got pokemon name param')
  console.log(req.query.name)
  P.getPokemonByName(req.query.name)
    .then((pokeres) => {
      const pokeObject = getPokemonObj(pokeres)
      res.send(pokeObject)
    })
    .catch((err) => res.send(err.message))
})

//catch pokemon!
router.put('/catch/:id', (req, res) => {
  console.log('we got pokemon name param')
  console.log(req.query.name)
  P.getPokemonByName(req.query.name)
    .then((pokeres) => {
      const pokeObject = getPokemonObj(pokeres)
      res.send(pokeObject)
    })
    .catch((err) => res.send(err.message))
})

function getPokemonObj(data) {
  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    types: getPokemonTypes(data),
    front_pic: data.sprites.front_default,
    back_pic: data.sprites.back_default,
    abilities: getAbilities(data.abilities),
  }
}

const getPokemonTypes = (data) => {
  let typesArr = []
  for (let type of data.types) {
    typesArr.push(`${type.type.name}`)
  }
  return typesArr
}

const getAbilities = (abilities) => {
  const array = []
  abilities.forEach((ability) => {
    array.push(ability.ability.name)
  })
  return array
}

module.exports = router
