const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./models/listing.js");

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  })
async function main() {
  await mongoose.connect(MONGO_URL);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.get("/",(req,res) => {
  res.send("Hi, i am root");
});

// Index route
app.get("/listings",async (req,res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs",{allListings});
});


// app.get("/testListing", async (req,res) => {
//   let sampleLisiting = new Listing({
//     title : "My New Villa",
//     description : "By the Beach",
//     price : 1200,
//     location : "Calangute, Goa",
//     country : "India",
//   });
//   await sampleLisiting.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});