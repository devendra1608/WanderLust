const express = require("express");
const app = express();

const mongoose = require("mongoose");


app.get("/",(req,res) => {
  res.send("Hi, i am root");
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});