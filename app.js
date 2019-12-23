var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require('passport-local'),
    methodOverride  = require("method-override")

//App Configuration
mongoose.connect("mongodb://localhost:/personal_website", {useNewUrlParser: true}); //connects to the local mongodb server
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); //Automatically search for .ejs files
app.use(express.static("public"));

//Schema Setup
var projectSchema = new mongoose.Schema({
    projectTitle: String,
    projectDescription: String,
    projectLink: String,
});

var Project = mongoose.model("Project", projectSchema);

// Project.create({
//     projectTitle: "Github Account",
//     projectDescription: "This is my github website where I publish all of my projects that I have finished. Fell free to take a look at them if you like!",
//     projectLink: "https://github.com/thienan100"
// }, function(err, project){
//     if(err){
//         console.log('!Error!');
//         console.log(err);
//     } else {
//         console.log(project);
//     }
// });

// =======================
// ROUTES
// =======================
app.get('/', function(req, res){
    res.redirect("/home")
})

//INDEX
app.get("/home", function(req, res){
    res.render('home');
});

// =========================
// Projects
// =========================
//Index
app.get("/projects", function(req, res){
    Project.find({}, function(err, projects){
        if(err){
            console.log("!Error!");
            console.log(err);
        } else{
            res.render("project", {projects: projects})
        }
    });
});

//New
app.get("/projects/new", function(req, res){
    res.render("new");
});

//Create
app.post("/projects", function(req, res){
    //creating project
    Project.create(req.body.project, function(err, newProject){
        if(err){
            console.log("!Error!");
            console.log(err);
        } else{
            //res redirect
            res.redirect("/projects")
        }
    })
})

//--------------------------------------
app.listen(3000,function(){
    console.log("Personal Website is Running")
});