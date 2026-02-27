const User = require("../models/User");
const bcrypt = require('bcrypt');
const auth = require('../auth.js');


const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const requiredChar = "@";
        const saltRounds = 12;

        if (!email || !password) {
            return res.status(400).send({ error: "Email and password are required."})
        }

        if (!email.includes(requiredChar)) {
            return res.status(400).send({ error: "Email is invalid."})
        }

        if (password.length < 8) {
            return res.status(400).send({ error: "Password needs to be at least 8 characters long."})
        }

        const newUser = new User ({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, saltRounds)
        })

        const savedUser = await newUser.save();
        return res.status(201).send(savedUser);
    } catch (err) {
        res.status(500).send({ error: 'Failed to register, please try again.' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const requiredChar = "@";
        if (!email.includes(requiredChar)) {
            return res.status(400).send({ error: "Email is invalid."})
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send({error: "User not found"});
        }

        const match = await bcrypt.compare(password, user.password);

        if(match) {
            return res.status(200).send({
              access: auth.createAccessToken(user)
            });
         } else {
            return res
              .status(401)
              .send({ error: "Email and password do not match" });
          }
    } catch (err) {
        res.status(500).send({ error: 'Failed to register, please try again.' });
    }
}

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting user details:", error);
    return res.status(500).json({ error: "Error getting user details" });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getUserDetails
};