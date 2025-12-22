const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const listingSchema = new Schema({
  title : {
    type : String,
    required : true,
  },
  description : String,
  image : {
    type : String,
    default : "https://www.hoteldel.com/wp-content/uploads/2021/01/hotel-del-coronado-views-suite-K1TOS1-K1TOJ1-1600x900-1.jpg",
    set : (v) => v === "" ? "https://www.hoteldel.com/wp-content/uploads/2021/01/hotel-del-coronado-views-suite-K1TOS1-K1TOJ1-1600x900-1.jpg" : v,
  },
  price : Number,
  location : String,
  country : String,
});

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;