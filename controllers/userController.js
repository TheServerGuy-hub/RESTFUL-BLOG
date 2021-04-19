const User = require("../models/userModel");

module.exports= {
    getForm: async (req, res) => {
        res.render("loginPage");
      },

    getRegDetails: async (req,res)=>{
        const { name, username, password }= req.body
        
        res.send("success");
    }
}