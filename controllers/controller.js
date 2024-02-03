const mongoose = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const passport = require("passport");
exports.homepage_get = asyncHandler(async (req, res, next) => {
	const post = await Post.find({})
		.populate("posted_by")
		.sort({ timestamp: -1 })
		.exec();
	res.render("home", { title: "Express", user: req.user, posts: post });
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
	if (req.user === undefined) {
		res.sendStatus(403);
	} else if (req.user.role === "member") {
		res.send("You have already been promoted to a member!");
	} else {
		res.render("secret");
	}
});

exports.secretPage_post = [
	body("code").matches(/11111/i).withMessage("Invalid Code").escape(),
	asyncHandler(async (req, res, next) => {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			res.render("secret", { errorMessages: result.array() });
			return 0;
		}

		const user = await User.findOneAndUpdate(
			{ _id: req.user._id },
			{ role: "member" },
			{
				returnOriginal: false,
			}
		);

		if (user) {
			res.redirect("/home");
		} else {
			res.sendStatus("404");
		}
	}),
];

exports.createPost_get = asyncHandler(async (req, res, next) => {
	if (req.user === undefined) {
		res.sendStatus(403);
	} else {
		res.render("post");
	}
});

exports.createPost_post = [
	body("title")
		.isLength({ min: 1, max: 60 })
		.withMessage("Title: Invalid length")
		.escape(),
	body("body")
		.isLength({ min: 1, max: 1000 })
		.withMessage("Body: Invalid lenght")
		.escape(),
	asyncHandler(async (req, res, next) => {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			res.render("post", { errorMessages: result.array() });
			return 0;
		}

		const newPost = new Post({
			title: req.body.title,
			body: req.body.body,
			posted_by: req.user._id,
			timestamp: new Date(),
		});

		newPost
			.save()
			.then(() => {
				res.redirect("/home");
			})
			.catch((err) => {
				res.sendStatus(404);
			});
	}),
];
