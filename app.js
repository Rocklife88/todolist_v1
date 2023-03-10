const express = require("express");
const bodyParser = require ("body-parser");
const res = require("express/lib/response");

const app = express();

let items=["Buy food", "Cook food", "Eat food"];
let workItems=[];


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Public"));

// template home
app.get("/", function (req, res) {
  let today = new Date();

  let options = { 
      weekday: "long",
      day: "numeric",
      month: "long"
  };
  
  let day=today.toLocaleDateString("it-IT", options);

  res.render("list", { listTitle: day , newListItems: items });
});

app.post("/", function(req,res){
  let item = req.body.newItem;

  if (req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");

  } else{
    items.push(item);
    res.redirect("/");

  }


});



//  template work
app.get ("/work", function(req, res){
  res.render("list", {listTitle: "Work list", newListItems: workItems});
});

app.get("/about", function (req,res){
  res.render("about");
})




app.listen(3000, function () {
  console.log("server started on port 3000");
});

