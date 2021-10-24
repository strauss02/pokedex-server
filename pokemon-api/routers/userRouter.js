const express = require('express')
const router = express.Router()
// let config = {
//   headers: {
//     header1: value,
//   },
// }

// let data = {
//   HTTP_CONTENT_LANGUAGE: self.language,
// }

router.post('/', (req, res) => {
  console.log('we have entered userRouter zone')
  const user = {
    username: req.header('username'),
  }
  console.log('request headers:', req.headers)
  console.log('line 9')
  console.log(user)
  res.send(user)
})

module.exports = router
