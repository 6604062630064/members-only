const mongoose = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");

const asyncHandler = require("express-async-handler");

exports.homepage_get = asyncHandler(async (req, res, next) => {
	res.render("index", { title: "Express" });
});

exports.signup_get = asyncHandler(async (req, res, next) => {
	res.render("register");
});

exports.signup_post = asyncHandler(async (req, res, next) => {
	res.sendStatus(404);
});

exports.login_post = asyncHandler(async (req, res, next) => {
	res.sendStatus(404);
});

exports.secretPage_get = asyncHandler(async (req, res, next) => {
	res.sendStatus(404);
});

exports.secretPage_post = asyncHandler(async (req, res, next) => {
	res.sendStatus(404);
});
