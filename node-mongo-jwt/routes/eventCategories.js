const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const { Category, validate } = require("../models/eventCategories");

router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(category);
});
// router.post("/", async (req, res) => {
//   console.log(req.body);
//   const { error } = validate(req.body);
//   if (error) return res.status(404).send(error.details[0].message);

//   let category = new Category({
//     categoryName: req.body.categoryName,
//     categoryDesc: req.body.categoryDesc,
//     active: req.body.active,
//   });

//   category = await category.save();
//   res.send(category);
// });
router.post("/",auth, async (req, res) => {
  
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let category = new Category({
    categoryName: req.body.categoryName,
    categoryDesc: req.body.categoryDesc,
    active: req.body.active,
  });

  category = await category.save();
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        categoryName: req.body.categoryName,
        categoryDesc: req.body.categoryDesc,
        active: req.body.active,
      },
    },
    { new: true }
  );
  if (!category)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(category);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(category);
});

module.exports = router;
