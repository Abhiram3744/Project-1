const express=require("express");
const mongoose=require("mongoose");
const app=express();
const Listing=require("./models/listing.js");
const mongo_url="mongodb://127.0.0.1:27017/wanderlust";
const path=require("path");
const methodOverride=require("method-override");


main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(mongo_url);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.get("/",(req,res)=>{
    res.send("working");
});

app.get("/listings",async(req,res)=>{
   const alllist =await Listing.find({});
   res.render("listings/index.ejs",{alllist});
      
});
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
   const list=await Listing.findById(id);
   res.render("listings/show.ejs",{list});
})
app.post("/listings",async(req,res)=>{
    console.log(req.body.listing);
    const newlist=new Listing(req.body.listing);
    await newlist.save();
    res.redirect("/listings");
})
app.get("/listings/:id/edit",async(req,res)=>{
     let {id}=req.params;
   const list=await Listing.findById(id);
   res.render("listings/edit.ejs",{list});
})
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.listing},{runValidators:true,new:true});
    res.redirect(`/listings/${id}`);
})
app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})



// app.get("/testlisting",async(req,res)=>{
//     let sample=new Listing({
//         title:"My new villa",
//         discription:"Very attracting",
//         price:1300,
//         location:"sheshadripuram,Banglore",
//         country:"India",
//     });
//     await sample.save();
// res.send("success");
// });
app.listen(8080,()=>{
console.log("App is listening")
});