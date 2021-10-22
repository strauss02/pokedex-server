const { response } = require('express')
const express = require('express')
const router = express.Router()
const Pokedex = require('pokedex-promise-v2')
const P = new Pokedex()
const fs = require('fs')
const { resolve } = require('path')

// let currentPokemon = {
//   id: 8,
//   name: 'wartortle',
//   height: 10,
//   weight: 225,
//   types: ['water'],
//   front_pic:
//     'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png',
//   back_pic:
//     'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/8.png',
//   abilities: ['torrent', 'rain-dish'],
// }

router.get('/get/:id', (req, res) => {
  console.log('we got id param')
  console.log(req.params.id)
  console.log(req.header('username'))
  P.getPokemonByName(req.params.id)
    .then((pokeres) => {
      const pokeObject = getPokemonObj(pokeres)
      res.send(pokeObject)
    })
    .catch((err) => res.send(err.message))
})

function requestPokemonObject(id) {
  return new Promise((resolve, reject) => {
    resolve(
      P.getPokemonByName(id)
        .then((pokeres) => {
          const pokeObject = getPokemonObj(pokeres)
          return pokeObject
        })
        .catch((err) => err.message)
    )
  })
}

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
router.put('/catch/:id', async function (req, res) {
  console.log('we got pokemon put request')
  console.log(req.params.id)
  const userName = req.header('username')
  const pokemonID = req.params.id
  handleCatch(userName, pokemonID)
  res.send('yoy')
  // createPokemonJson(currentPokemon, userName)
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

//check user exists, if not, create it's folder
function handleCatch(user, id) {
  console.log('handlecatch id', id)
  fs.readdir('./users', (err, res) => {
    if (err) {
      console.log(err)
      return
    }
    if (!res.includes(user)) {
      console.log('no user exists. creating new user folder')
      fs.mkdirSync(`./users/${user}`)
    }
    createPokemonJson(id, user)
  })
}

//creates a pokemon.json file in the user's folder
function createPokemonJson(id, user) {
  fs.readdir(`./users/${user}`, async (err, res) => {
    if (err) {
      console.log(err)
    } else {
      console.log('id in createpokemonjson', id)
      // const pokeObject = requestPokemonObject(id)
      // console.log('pokeObject is:', pokeObject)
      if (res.includes(`${id}.json`)) {
        console.log('pokemon already exists')
        return
      } else {
        console.log('no pokemon found')
        const object = await requestPokemonObject(id).then((res) => res)
        console.log(object)
        fs.writeFileSync(`users/${user}/${id}.json`, JSON.stringify(object))
      }
    }
  })
}

module.exports = router
