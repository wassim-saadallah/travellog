const { Router } = require('express')
const User = require('../models/user')

const router = Router()

router.get('/', (req, res) => {
  const { email } = req.query 
  console.log(email)
  return res.send({ message: 'email: ' + email })
})

router.post('/', (req, res) => {
  const { email } = req.body

  const newUser = User({ email })
  user.save()



}
module.exports = router
