const Express = require("express");
const app = Express();
const fs = require('fs');
const users = require("./MOCK_DATA.json");
const { join } = require("path");

//middleware for json 
app.use(Express.urlencoded({extended : false}));

app.get("/username", (req, res) => {
  const html = `
      <ul>
          ${users.map((users) => `<li>${users.first_name}</li>`).join("")}
      </ul>
      `;
  res.send(html);
});
//REST API
app.get("/users", (req, res) => {
  res.send(users);
});

//finding the user with the id and doing oparetion according to req
app
  .route("/user/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    res.json(user);
  })
  .patch((req, res) => {
    //edit user
    return res.json({ stastus: pending });
  })
  .delete((req, res) => {
    //delete user
    return res.json({ stastus: pending });
  });

app.post("/user", (req, res) => {
  //create new user
  const body = req.body
  console.log(body);
  users.push({...body ,id: users.length+1});
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users),(err,data)=>{
    if (err) {
      console.error("Error writing to file:", err);
      return res.status(500).json({ error: "Error writing to file" });
    }
    // If no error, send success response
    return res.json({ success: "User added successfully", id: users.length });
  });

});

module.exports = app;
