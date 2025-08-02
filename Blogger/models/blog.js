const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }, { versionKey: false } // Disable __v field
);

const Blog = mongoose.model("Blogs", blogSchema);

module.exports = Blog;
