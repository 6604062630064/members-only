const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
	username: {
		type: String,
		validator: {
			validator: (v) => /^([\w-]+)$/.test(v),
		},
		required: true,
		max: 13,
		unique: true,
	},
	role: { type: String, required: true, enum: ["guest", "member"] },
});

module.exports = mongoose.model("User", UserSchema);
