const mongoose  = require("mongoose");
const Schema=mongoose.Schema;
const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    discription:String,
     image:{
       filename:{
         type:String,
        default:"listingimage",
       },
       url:{
        type:String,
        default:"https://unsplash.com/photos/a-brick-house-with-white-shutters-and-a-green-lawn-719ljc33Fgs",
        
    },
    },
    price:Number,
    location:String,
    country:String,
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
