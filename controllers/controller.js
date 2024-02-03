const mongoose = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const passport = require("passport");
exports.homepage_get = asyncHandler(async (req, res, next) => {
	res.render("home", { title: "Express", user: req.user });
});

exports.signup_get = asyncHandler(async (req, res, next) => {
	res.render("register", { extraScript: true });
});

exports.signup_post = [
	body("username")
		.trim()
		.matches(/^([\w-]+)$/)
		.withMessage("Invalid name")
		.custom(async (v) => {
			const isExisted = await User.findOne({ username: v }).exec();
			if (isExisted) {
				throw new Error("This username already exists.");
			}
		})
		.escape(),
	body("password")
		.trim()
		.matches(/^([\w-]+)$/)
		.withMessage("Invalid password")
		.escape(),
	asyncHandler(async (req, res, next) => {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			res.render("register", {
				extraScript: true,
				errorMessages: result.array(),
			});
			return 0;
		}

		const newUser = new User({
			username: req.body.username,
			password: req.body.password,
			role: "guest",
		});

		newUser
			.save()
			.then((v) => {
				res.redirect("/home");
			})
			.catch((err) => {
				res.sendStatus(404);
			});
	}),
];

exports.login_post = [
	passport.authenticate("local", {
		successRedirect: "/home",
		failureRedirect: "/home",
	}),
	asyncHandler(async (req, res, next) => {}),
];

exports.logout_post = [
	asyncHandler(async (req, res, next) => {
		req.logout((err) => {
			if (err) {
				return next(err);
			}
			res.redirect("/home");
		});
	}),
];

exports.secretPage_get = asyncHandler(async (req, res, next) => {
	res.sendStatus(404);
});

exports.secretPage_post = asyncHandler(async (req, res, next) => {
	res.sendStatus(404);
});

exports.createPost_get = asyncHandler(async (req, res, next) => {
	res.sendStatus(404);
});

exports.createPost_post = asyncHandler(async (req, res, next) => {
	res.sendStatus(404);
});
