const express = require('express');
const app = express();  
const mongoose = require('mongoose');
const cors = require('cors');
const userSignup = require('./routes/userSignup');
const getUsers = require('./routes/getUsers');
const private = require('./routes/privateRoute');
const userLogin = require('./routes/login');
const { decrypt, encrypt } = require('./utils/privateKeyEncrypt');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  // process.env.DB_CONNECT_URI,
  "mongodb+srv://bitsanAdmin:bitsanDbPwd@cluster0.ulhvpm6.mongodb.net/bitsan?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
 () => console.log("database connected")
)

app.use("/signup", userSignup)
app.use("/login", userLogin)
app.use("/private", private)
app.use("/getUsers", getUsers)

app.get("/", (req, res) => {
  res.status(200).send({
    greetings: "welcome to bitsan we are happy to see you online",
  });
});
// console.log(encrypt("yo hey guy"))
// console.log(encrypt("yo hey guy"))
// console.log(decrypt('be64aa749d0afa8add724b4186384620'))
app.listen(process.env.PORT || 5000, () => console.log("user hit the server"));
