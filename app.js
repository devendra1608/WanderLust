const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

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
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


app.get("/",(req,res) => {
  res.send("Hi, i am root");
});

// Index route
app.get("/listings",async (req,res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs",{allListings});
});

// Add New Listing Route(Must be kept above Listing Route else it will consider new as an id and return an error).
app.get("/listings/new", (req,res) => {
  res.render("listings/new.ejs");
});

// Show Listing Route
app.get("/listings/:id", async (req,res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

// Create new Lisiting Route 
app.post("/listings", async (req,res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

// Edit Route
app.get("/listings/:id/edit" , async (req,res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

// Update Route
app.put("/listings/:id", async (req,res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);
});

// Delete Route
app.delete("/listings/:id", async (req,res) => {
  let { id } = req.params;
  let DeletedListing = await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
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