const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const { User, validate } = require("../models/userModule");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});
// router.get("/:id", async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (!user)
//     return res
//       .status(404)
//       .send("The customer with the given ID was not found.");
//   res.send(user);
// });

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let email = await User.findOne({ email: req.body.email });
  if (email) return res.status(400).send("user email already exits");

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(10); // basic value used -10
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  //payload , Secret key
  //const token = jwt.sign({ _id: user._id }, "jwtPrivateKey");
  //const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  //const token = user.generateAuthToken();
  //res.header("x-auth-token", token).send(user);
  res.send(true);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    },
    { new: true }
  );
  if (!user)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(user);
});

module.exports = router;
