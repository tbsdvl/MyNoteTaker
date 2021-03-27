const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), (err, data)  => {
        if (err) throw err;
        let obj = JSON.parse(data);
        console.log(obj);
        res.json(obj);
    })
});

app.post("/api/notes", (req, res) => {
    const newNote = req.body;

    fs.appendFile(path.join(__dirname, "/db/db.json"), newNote, (err) => {
        if (err) throw err;
    })
})

app.listen(PORT, console.log(`App listening on PORT: ${PORT}`));