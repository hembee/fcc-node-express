let express = require('express');
const bodyParser= require("body-parser")
let app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use("/public", express.static(__dirname + "/public"));
app.use((req, res, next) => {
  let method = req.method;
  let path = req.path;
  let ip = req.ip;
  let string = method + " " + path + " " + "-" + " " + ip
  console.log(string)
  next();
})

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({ "time": req.time });
});

app.get("/:word/echo", (req, res) => {
  const word = req.params.word
  res.json({ echo: word })
})

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
})
app.get("/json", (req, res) => {
  const mySecret = process.env['MESSAGE_STYLE']
  if (mySecret === "uppercase") {
    res.json({ "message": "HELLO JSON" })
  } else {
    res.json({ "message": "Hello json" })
      ;
  }
})
app.route("/name")
.get((req, res)=>{
  const firstname= req.query.first;
  const lastname= req.query.last;
  
  res.json({name: firstname + " " + lastname})
})
.post((req, res)=>{
  const firstname= req.body.first;
  const lastname= req.body.last;
  res.json({name: firstname + " " + lastname})
})

console.log("Hello World")


































module.exports = app;
