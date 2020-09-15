const express = require("express")
const passport = require("../config/passport")
const validator = require("../config/validator")
const gameController = require("../controllers/controllerGames")
const usersController = require("../controllers/controllerUsers")
const newsController = require("../controllers/controllerNews")
const router = express.Router()

router.route("/games")
    .post(gameController.addGame)

router.route("/games/:id")
.get(gameController.getSpecificGames)

router.route("/category")
    .post(gameController.addCategory)

router.route('/categories')
    .get(gameController.getCategories)

router.route('/user')
    .post(validator.validateData, usersController.createAccount)

router.route('/login')
    .post(usersController.userLogin)

router.route('/tokenVerificator')
    .get(passport.authenticate('jwt', { session: false }), usersController.tokenVerificator)

router.route('/setConsole')
    .put(usersController.setConsole)

router.route('/news')
    .post(newsController.addNews)
    .get(newsController.getNews)

module.exports = router

