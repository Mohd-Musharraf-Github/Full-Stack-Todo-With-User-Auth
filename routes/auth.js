const router = require("express").Router();
const user = require("../modals/user.js");
const User = require("../modals/user.js");
const bcrypt = require("bcryptjs");

//SignUp.....

router.post("/register", async (req,res)=>{
    try {
        const { email , username , password } = req.body;
        const hashpassword = bcrypt.hashSync(password);
        const user = new User({ email , username , password : hashpassword });
        await user.save().then(()=>
            res.status(200).json({ message:"Sign Up Sucessfull" })
        );
        
    } catch (error) {
        console.log(error)
        res.status(200).json({ message: "user already exist"});
    }
});

//Login 

router.post("/signin", async(req,res)=>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(200).json({message: "Please Sign Up First"})
        }

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

        if(!isPasswordCorrect){
            res.status(200).json({message: "Password is incorrect"});
        }

        const{password,...others} = user._doc;
        res.status(200).json({others});
        
    } catch (error) {
        console.log(error);
        
        res.status(400).json({message: "Login error error!"})
    }
})

router.post("/check", async(req,res) =>{
try {
    const myuser = await User.findOne({email: req.body.email});
    if(myuser){
        console.log(myuser);
        res.send(myuser);
        
    }
} catch (error) {
    console.log(error);
    
}
})


module.exports = router;