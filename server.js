const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const fs = require('fs');
// Use the array below to store the users. Add/remove/update items in it based off

let storage = [];
app.use(bodyParser.json());

// this is to test the server
app.get('/hello', function (req, res) { 
  res.send('This is working');
})



// Get all users
app.get('/users/', function (req, res) {
  fs.readFile('./storage.json', 'utf8', function (err, data) {
    if(err) throw err;
    let usersData = JSON.parse(data);

    res.json(usersData);
  })
});

// GET one user
app.get('users/:name', function (req, res) {
  let data = fs.readFileSync('./storage.json', 'utf8');
  let parseUser = JSON.parse(data);

  for (let i = 0; i < parseUser.length; i++) {
    if (parseUser[i].name == req.params.name) {
      res.json(parseUser[i]);
      return;
    }

  }
  res.send("All Done");
})

// Create User
app.post('users', function (req, res) {
  fs.readFile("./storage.json", "utf8", function (err, data) {
    if(err) throw err;
    let usersData = JSON.parse(data);
    
    console.log(req.body);
    usersData.push(req.body);

    fs.writeFile("./storage.json", JSON.stringify(usersData), function(err) {
      if(err) throw err;

      res.sendStatus(200);
    })
  })

  res.send('New User Added');
})


// Update one user
app.put('/users/:name', function (req, res) {
  fs.readFile('./storage.json', 'utf8', function(err, data) {
    if (err) throw err;
    let usersData = JSON.parse(data);

    for (let i = 0; i < usersData.length; i ++) {
      if(usersData[i].name == req.params.name) {
        usersData[i] = req.body;

        fs.writeFile('./storage.json', JSON.stringify(usersData), function (err) {
          console.log("Updated User!");
          res.sendStatus(200);
        });
        return;
      }
    }
    res.sendStatus(400);
  })
});

// Delete one user
app.delete('/users/:name', function (req, res) {
  fs.readFile('./storage.json', 'utf8', function (err, data) {
    if (err) throw err;
    let usersData = JSON.parse(data);

    for(let i = 0; i < usersData.length; i++) {
      if(usersData[i].name == req.params.name) {
        usersArr.splice(i, 1);

        fs.writeFile('./storage.json', JSON.stringify(usersData), function (err) {
          console.log("success!");
          res.sendStatus(200);
        });
        return;
      }
    }
    res.sendStatus(400);
  })
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
