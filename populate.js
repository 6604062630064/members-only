require("dotenv").config();

const mongoose = require("mongoose");

const Post = require("./models/post");
const User = require("./models/user");
const users = [];
const KEY = process.env.KEY;

main().catch((err) => console.log(err));
async function main() {
	console.log("Debug: About to connect");
	await mongoose.connect(KEY);

	console.log("Debug: Connected");
	await mongoose.connection.dropDatabase();
	console.log("Debug: Cleard database");
	await createUsers();
	console.log("Debug: Uploaded users");
	await createPosts();
	console.log("Debug: Uploaded posts");
	console.log("Debug: Closing mongoose");
	mongoose.connection.close();
}

async function userCreate(index, username, password, role) {
	const user = new User({
		username: username,
		password: password,
		role: role,
	});
	await user.save();
	users[index] = user;
	console.log(`Added user: ${username}`);
}

async function postCreate(title, body, posted_by) {
	const post = new Post({
		title: title,
		body: body,
		posted_by: posted_by,
		timestamp: new Date(),
	});
	await post.save();
	console.log(`Added post: ${title}`);
}

async function createUsers() {
	console.log("Adding users");
	await Promise.all([
		userCreate(0, "bro123", "12345", "guest"),
		userCreate(1, "motherFuck", "password", "guest"),
		userCreate(2, "testUser", "password", "member"),
	]);
}

async function createPosts() {
	console.log("Adding posts");
	await Promise.all([
		postCreate("hello", "test11111111111111", users[2]),
		postCreate("hello2", "hi noob", users[2]),
		postCreate("hello4", "lorem si dfdsfaldjsaodasod", users[2]),
	]);
}
