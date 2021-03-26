const express = require("../../express");
const app = express();


const PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.get("*", (req, res) => {
    res.send("index.html");
});

app.get("/notes", (req, res) => {
    res.send("notes.html");
});

app.get("/api/notes", (req, res) => {
    res.send("db.json");
});

// For unique ids, i need uuid from npm
app.post("/api/notes", (req, res) => {
    res.send("")
});

app.listen(PORT, console.log(`App listening on PORT: ${PORT}`));