//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vte odiulputao ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var _ =require("lodash");

const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://admin-omkar:oppoa37f@cluster0.usfdn.mongodb.net/Posts",{useNewUrlParser:true,useUnifiedTopology:true});

const postSchema={
  title:String,
  post:String
}
const Post=mongoose.model("Post",postSchema);



app.get("/",function(req,res){
  Post.find({},function(err,dataFound){
    if(!err)
    {
    res.render("home",{ejsHomeStartingContent:homeStartingContent,ejsHomePosts:dataFound});
  }   
  });


});

app.get("/about",function(req,res){
  res.render("about",{ejsHomeStartingContent:homeStartingContent});
  });


  app.get("/contact",function(req,res){
    res.render("contact",{ejsHomeStartingContent:homeStartingContent});
    });
    

app.get("/compose",function(req,res){
  res.render("compose");
  });

  app.get("/posts/:postName",function(req,res){
  var requestedPost= _.lowerCase(req.params.postName);
  Post.find({},function(err,dataFound){
    dataFound.forEach(function(item){
    if(!err){ 
      var requestedTitle= _.lowerCase(item.title);
      if(requestedTitle==requestedPost)
      {
      res.render("post",{ejsPostTitle:_.capitalize(item.title),ejsPostPost:item.post});
    }
  }
    });
    
  });
    });


  app.post("/compose",function(req,res){
    var newPost=new Post({
     title:_.capitalize(req.body.title),
     post:req.body.post
    });
  newPost.save(function(err){
    if(!err)
    {
      res.redirect("/");
    }
  });
  });

  let port = process.env.PORT;
  if (port == null || port == "") {
    port = 3000;
  }
  app.listen(port,function(){
  });
