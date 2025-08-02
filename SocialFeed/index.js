const express = require("express");
const multer = require("multer"); // used for uploading files.
const path = require("path");
const mysql = require("mysql2");
const methodOverride = require("method-override");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// Configure multer for file uploads
const storage = multer.diskStorage({ // Configures how and where uploaded files are stored.
    destination: function (req, file, cb) { // Defines the folder where files will be stored after upload.
        cb(null, path.join(__dirname, "public/uploads/"));
    },
    filename: function (req, file, cb) { // Specifies how the uploaded file should be named.
        cb(null, Date.now() + path.extname(file.originalname)); // named using the current timestamp (Date.now()) followed by the file's original extension (path.extname(file.originalname)).
    }
});

const upload = multer({ storage: storage }); // instance of Multer configured with the diskStorage object.

// Create a connection to the database
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "social_feed",
    password: "Yash@2005",
});

connection.connect((err) => {
    if(err) {
        console.error("Error in connecting to the database", err);
        return;
    }
    console.log("Connected to the MYSQL Database");
});

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/upload", (req, res) => {
    res.render("upload.ejs");
});

app.get("/upload/new", (req, res) => {
    res.render("new.ejs");
});

app.get("/feeds", (req, res) => {
    const q = "SELECT * FROM feeds ORDER BY created_at DESC";
    connection.query(q, (err, results) => {
        if(err) {
            console.error("Error in fetching data from database:", err);
            return res.status(500).send("Database error");
        }

        // console.log(results);
        res.render("feeds.ejs", { feeds: results });
    });
});

app.post("/feeds", upload.single("file"), (req, res) => { // handle file uploads with options like .single() for single file uploads
    let { username, caption } = req.body;
    // if (!req.file) {
    //     return res.status(400).send("No file uploaded");
    // }
    // console.log(req.file); // request object (req) will include a file property which contains the metadata about uploaded file (saved now)
    const filePath = `uploads/${req.file.filename}`; // Path to the uploaded file

    // Save the data to the database
    const q = "INSERT INTO feeds (username, file_path, caption) VALUES (?, ?, ?)";
    connection.query(q, [username, filePath, caption], (err, result) => {
        if(err) {
            console.error("Error in inserting data into database", err);
            return res.status(500).send("Database error");
        }

        res.redirect("/feeds");
    });
});

app.get("/feeds/:id", (req, res) => {
    const id = req.params.id;
    const q = `SELECT * from feeds WHERE id=?`;
    connection.query(q, [id],(err, result) => {
        if(err) {
            console.error("Error in fetching data from database:", err);
            return res.status(500).send("Database error");
        }

        // console.log(result);
        res.render("edit.ejs", { feed: result });
    });
});

app.patch("/feeds/:id", upload.single("file"), (req, res) => {
    const id = req.params.id;
    let { caption } = req.body;
    
    const filePath = `uploads/${req.file.filename}`;

    const q = "UPDATE feeds SET file_path=?, caption=? WHERE id=?";
    connection.query(q, [filePath, caption, id], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).send("Database error");
        }

        res.redirect("/feeds");
    });
});

app.delete("/feeds/:id", (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM feeds WHERE id=?";

    connection.query(q, [id], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).send("Database error");
        }

        res.redirect("/feeds");
    });
});

app.get("/feeds/likes/:id", (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM feeds WHERE id=?"

    connection.query(q, [id], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).send("Database error");
        }

        let updatedLikes = result[0].likes + 1;
        const q = "UPDATE feeds SET likes=? WHERE id=?";

        connection.query(q, [updatedLikes, id], (err, result) => {
            if(err) {
                console.error(err);
                return res.status(500).send("Database error");
            }

            res.redirect("/feeds");
        });
    });
});

app.get("/feeds/comments/:id", (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM feeds WHERE id=?";

    connection.query(q, [id], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).send("Database error");
        }

        let feed = result[0];
        const q = "SELECT * FROM comments WHERE feed_id=?"
        connection.query(q, [feed.id], (err, result) => {
            if(err) {
                console.error(err);
                return res.status(500).send("Database error");
            }

            // console.log(feed); console.log(result);
            res.render("comments.ejs", { feed, comments: result } );
        });
    });
});

app.patch("/feeds/comments/:id", (req, res) => {
    const id = req.params.id;
    const { username, comment } = req.body;
    const q = "INSERT INTO comments (feed_id, username, comment) VALUES (?, ?, ?)";
    connection.query(q, [id, username, comment], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).send("Database error");
        }
        
        res.redirect(`/feeds/comments/${id}`);
    });
});

const port = 8080;

app.listen(port, () => {
    console.log("app is listening on port 8080");
});
