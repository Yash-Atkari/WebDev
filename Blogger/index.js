const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Blog = require("./models/blog.js");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

main()
    .then((res) => {
        console.log("connection successful");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/bloggerApp');
}

const port = 8080;

app.get("/", (req, res) => {
   res.render("home.ejs"); 
});

app.get("/blogs", async (req, res) => {
    const blogs = await Blog.find();
    // console.log(blogs);
    res.render("blogs.ejs", { blogs });
});

app.get("/blogs/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/blogs", async (req, res) => {
    let { title, content, name } = req.body;
    let newBlog = new Blog({
        title: title,
        content: content,
        name: name,
    });
    await newBlog.save();

    // console.log(newBlog);
    res.redirect("/blogs");
});

app.get("/blogs/view/:id", async (req, res) => {
    let id = req.params.id;
    let blog = await Blog.findById(id);
    res.render("view.ejs", { blog });
});

app.delete("/blogs/:id", async (req, res) => {
    let id = req.params.id;
    let deletedBlog = await Blog.findByIdAndDelete(id);
    res.redirect("/blogs");
});

app.get("/blogs/edit/:id", async (req, res) => {
    let id = req.params.id;
    let deletedBlog = await Blog.findByIdAndDelete(id);
    res.render("edit.ejs", { deletedBlog });
});

app.listen(port, () => {
    console.log("app is listening on port 8080")
});
