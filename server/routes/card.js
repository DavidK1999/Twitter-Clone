const express = require('express')
const router = express.Router()
const verify = require('../verifyToken')
const Card = require('../models/Card')


router.get('/all', verify , async (req, res) => {
    allCards = await Card.find()
    console.log(allCards)
    for(let card of allCards) {
        if(req.user.username === card.user_username) {
            card.verified = true
        }
    }
    res.send(allCards)
})

router.post('/post', verify, async (req, res) => {
    req.body.user_username = req.user.username
    const newCard = await Card.create(req.body)
    res.send(newCard)
})


module.exports = router