var express = require("express");
var router = express.Router();
const controller = require("../controllers/controller");
/* GET home page. */
router.get("/", function (req, res, next) {
	res.redirect("/home");
});

router.get("/home", controller.homepage_get);
router.get("/register", controller.signup_get);
router.get("/secret", controller.secretPage_get);
router.get("/create", controller.createPost_get);

router.post("/login", controller.login_post);
router.post("/logout", controller.logout_post);
router.post("/register", controller.signup_post);
router.post("/secret", controller.secretPage_post);
router.post("/create", controller.createPost_post);

router.get("*", function (req, res, next) {
	res.sendStatus(404);
});
module.exports = router;
