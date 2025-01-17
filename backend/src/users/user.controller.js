const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET_KEY

const createNewAdmin = async (req, res) => {
  const { username, password, role } = req.body;
  const saltRounds = 10;
  const createAdmin = async () => {
    const encrypted_password = await bcrypt.hash(password, saltRounds);
    const newAdmin = await User({
      username: username,
      password: encrypted_password,
      role: role,
    });

    try {
      await newAdmin.save();
      console.log("Admin created successfully", newAdmin);
      res
        .status(200)
        .send({ message: "Admin created successfully", user: newAdmin });
    } catch (err) {
      console.log("Error creating admin", err);
      res.status(500).send({ message: "Failed to create admin" });
    }
  };
  createAdmin();
};

const checkAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await User.findOne({ username: username });
    if (!admin) {
        console.log("Admin with this username does not exist. User: ", admin)
            res.status(403).send({message: "Admin with this username does not exist", admin})        
    }
    else if (admin.role !== 'admin') {
        console.log("This user does not have admin privilege.", admin.role)
            res.status(403).send({message: "This user does not have admin privilege.", admin})        
    }
    else if (!bcrypt.compareSync( password, admin.password)) {
        console.log("Invalid credentials")
            res.status(401).send({message: "Invalid credentials"})                
    }
    else {
        const token = jwt.sign({
            id: admin._id, username: admin.username, role: admin.role
        }, JWT_SECRET, {expiresIn: "1h"})   
        return res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: {
                username: admin.username,
                role: admin.role,
            },
        })    
         
    }
  } catch (err) {
    console.log("Error checking admin", err)
        res.status(500).send({message: "Failed to check for admin"})
  }
};

module.exports = {
  createNewAdmin,
  checkAdmin,
};
