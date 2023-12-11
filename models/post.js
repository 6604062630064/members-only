const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
	title: { type: String, required: true, max: 60 },
	body: { type: String, required: true, max: 1000 },
	posted_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
	timestamp: { type: Date, required: true },
});

postSchema.virtual("url").get(() => {
	return "/posts/" + this._id;
});

module.exports = mongoose.model("Post", postSchema);
