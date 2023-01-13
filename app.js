const express = require("express");
const bodyParser = require ("body-parser");

const app = express();

let items=["Buy food", "Cook food", "Eat food"];


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Public"));


app.get("/", function (req, res) {
  let today = new Date();

  let options = { 
      weekday: "long",
      day: "numeric",
      month: "long"
  };
  
  let day=today.toLocaleDateString("it-IT", options);

  res.render("list", { kindOfDay: day , NewListItems: items });
});

app.post("/", function(req,res) {
  var item =req.body.newItem;
  
items.push(item);

res.redirect("/");

});

app.listen(3000, function () {
  console.log("server started on port 3000");
});

