const { Router } = require('express')
const User = require('../models/user')

const router = Router()

router.get('/', async (req, res) => {
  const { email } = req.query
  if (email == null || email === '') {
    return res.status(403).send({ message: `Not a valid email` })
  }
  try {
    const user = await User.findOne({ email }).exec()
    if (!user) {
      return res.status(404).send({ message: `User with email ${email} is not found` })
    }
    return res.send({ token: user._id })
  } catch (err) {
    return res.status(500).send({ message: `Database error` })
  }
})

router.post('/', async (req, res) => {
  console.log(req.body)
  const { email } = req.body

  const user = await User.findOne({ email }).exec()
  if (user) {
    return res.status(500).send({ message: `User with this already exists` })
  }

  const newUser = await new User({ email }).save()
  return res.send({ token: newUser._id })
})

module.exports = router
