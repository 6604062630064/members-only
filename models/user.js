const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
	username: {
		type: String,
		validator: {
			validator: (v) => /^([\w-]+)$/.test(v),
		},
		required: true,
		min: 5,
		max: 13,
		unique: true,
	},
	password: {
		type: String,
		max: 128,
	},
	role: { type: String, required: true, enum: ["guest", "member"] },
});

UserSchema.pre("save", function (next) {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(this.password, salt, (err, hash) => {
			this.password = hash;
			return next();
		});
	});
});
module.exports = mongoose.model("User", UserSchema);
