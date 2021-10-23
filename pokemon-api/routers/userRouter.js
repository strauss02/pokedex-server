const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  const user = {
    username: req.header('username'),
  }
  res.send(user)
})

module.exports = router
