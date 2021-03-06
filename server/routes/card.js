const express = require('express')
const router = express.Router()
const verify = require('../verifyToken')
const Card = require('../models/Card')
const User = require('../models/User')

const ownsIt = (user, collection) => {
    for(let card of collection) {
        if(user.username === card.user_username) {
            card.verified = true
        }
    }
}

const upvotedIt = (user, collection) => {
    for(let card of collection) {
        if(card.upvotes.includes(user.username)) {
           card.upvoted = true
        }
    }
}

const upvotedItLikes = collection => {
    for(let card of collection) {
        if(card.upvotes.length !== 0) {
            card.upvoted = true
        }
    }
}

router.get('/all', verify , async (req, res) => {
    try {
        let allCards = await Card.find()
        ownsIt(req.user, allCards)
        upvotedIt(req.user, allCards)
        res.send(allCards)
    } catch (error) {
        console.log(error)
    }
})

router.get('/personal', verify , async (req, res) => {
    try {
        let user = await User.findOne({"username": req.user.username})
        let personalCards = await Card.find({$or: [{"user_username": req.user.username}, {"user_username": {$in: user.following}}]})
        ownsIt(req.user, personalCards)
        upvotedIt(req.user, personalCards)
        res.send(personalCards)
    } catch (error) {
        res.json(req.error)
    }
})

router.get('/profile/:username', verify , async (req, res) => {
    try {
        let profileCards = await Card.find({user_username: req.params.username})
        ownsIt(req.user, profileCards)
        upvotedIt(req.user, profileCards)
        res.send(profileCards)
    } catch (error) {
        console.log(error)
    }
})

router.get('/likes/:username', verify , async (req, res) => {
    try {
        let likedCards = await Card.find({"upvotes" : {$in: [req.params.username]}})
        ownsIt(req.user, likedCards)
        upvotedItLikes(likedCards)
        res.send(likedCards)
    } catch (error) {
        console.log(error)
    }
})

router.get('/tagged/:tag', verify, async (req, res) => {
    try {
        let taggedCards = await Card.find({"tags": {$in: [req.params.tag]}})
        ownsIt(req.user, taggedCards)
        upvotedItLikes(taggedCards)
        res.send(taggedCards)
    } catch (error) {
        console.log(error)
    }
})

router.post('/post', verify, async (req, res) => {
    try {
        req.body.user_username = req.user.username
        const newCard = await Card.create(req.body)
        res.json(newCard)
    } catch (error) {
        console.log(error)
    }
})

router.put('/upvote/:cardID', verify, async (req, res) => {
    try {
        let upvotedCard = await Card.findByIdAndUpdate(req.params.cardID, 
            {$addToSet: {"upvotes": req.user.username}}, {new: true}
        )
        req.user.username === upvotedCard.user_username ? upvotedCard.verified = true : upvotedCard.verified = false
        upvotedCard.upvotes.includes(req.user.username) ? upvotedCard.upvoted = true : upvotedCard.upvoted = false
        res.send(upvotedCard)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/delete/:cardID', verify, async (req, res) => {
    try {
        let deletedCard = await Card.findById(req.params.cardID)
        if(req.user.username === deletedCard.user_username) {
            await Card.findByIdAndDelete(req.params.cardID)
            res.send({status: 200, message: 'Success'})
        } else {
            res.send({status: 400, message: "You don't own this"})
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router