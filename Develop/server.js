// Importing necessary modules
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const app = express();

// Setting up server's port
const PORT = process.env.PORT || 8080;

// Allows server to use static files and use db.json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Get method for home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Get method for note taker page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// Get method for note taker's api database
app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), (err, data)  => {
        if (err) throw err;
        let obj = JSON.parse(data);
        console.log(obj);
        res.json(obj);
    })
});

// Post method to write data into notes api
app.post("/api/notes", (req, res) => {

    // Creates a new entry
    const newEntry = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    }

    // Reads the db.json file and pushes the new note data into the db.json's array
    fs.readFile(path.join(__dirname, "/db/db.json"), 'utf8', (err, data) => {
        if (err) throw err;
        var dbData = JSON.parse(data);
        dbData.push(newEntry);
        dbData = JSON.stringify(dbData, null, 2);

        // Rewrites the file with the newly added note data
        fs.writeFile(path.join(__dirname, "/db/db.json"), dbData, (err) => {
            if (err) throw err;
        });
    });

    // Displays all recorded notes on website
    res.redirect("back");
});


// DELETE POST ATTEMPT
// app.delete("/api/notes/:id", (req, res) => {

//     const noteId = req.params;

//     fs.readFile(path.join(__dirname, "/db/db.json"), utf8, (err, data) => {
//         if (err) throw err;
//         var dbData = JSON.parse(data);
//         dbData = JSON.stringify(dbData, null, 2);
//         for(var i = 0; i < newArr.length; i += 1) {
//             if(dbData[i]["id"] === noteId) {
//                 dbData.filter(dbData[i]);
//             }
//           }
//         fs.writeFile(path.join(__dirname, "/db/db.json"), dbData, (err) => {
//             if (err) throw err;
//         })
//     })
//     res.redirect("back");
// })

// Listens for our server's port and displays a message 
// showing which port the server runs on
app.listen(PORT, console.log(`App listening on PORT: ${PORT}`));
