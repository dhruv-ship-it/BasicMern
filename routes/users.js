const router= require("express").Router();
let User= require("../models/user.model");


router.route("/").get((req,res)=>{
    User.find().then((users)=>{
        res.json(users)
    }).catch((err)=>{
        res.status(400).send(`Error`+err)
    });
});


router.route("/add").post((req,res)=>{
    
    const username=req.body.username;
    const newUser= new User({
        username
    })
    newUser.save().then(()=>{
        res.send("User Added")
    }).catch((err)=>{
        res.status(400).send("error"+err)

    })
});

module.exports=router;
