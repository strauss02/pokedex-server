const express = require('express')
const app = express()
const port = 8080

//start server listening
app.listen(port, () => console.log('listening on', port))

//route the app
app.get('/', (req, res) => {
  res.send('we got a get request ')
})
