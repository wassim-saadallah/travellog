const { Router } = require('express')
const User = require('../models/user')

const router = Router()

router.get('/', async (req, res) => {
  const { email } = req.query
  try {
    const user = await User.findOne({email}).exec()
    if (!user) {
    return res.status(404).send({message: `User with email ${email} is not found`})

    }
    return res.send({ token: user._id }) 
  }catch(err) {
    return res.status(500).send({message: `Database error`})
  }
})

router.post('/', async (req, res) => {
  const { email } = req.body

  const newUser = new User({ email })
  const user = await newUser.save()
  return res.send({ token: user._id })
})

module.exports = router
