const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const { Events, validate } = require("../models/eventModule");
const { Category } = require("../models/eventCategories");

router.get("/", async (req, res) => {
  const events = await Events.find();
  res.send(events);
});
router.get("/:id", async (req, res) => {
  const event = await Events.findById(req.params.id);
  if (!event)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(event);
});
router.post("/", async (req, res) => {
  //console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  let event = new Events({
    EventName: req.body.EventName,
    EventDescription: req.body.EventDescription,
    EventLocation: req.body.EventLocation,
    Active: req.body.Active,
    Adultticketprice: req.body.Adultticketprice,
    Childticketprice: req.body.Childticketprice,
    //we can go with eventCategory:category -- as we dont want all the fields of cartegory 
    //we are choosing only id and name
    eventCategory: {
      _id: category._id,
      categoryName: category.categoryName,
    },
  });

  event = await event.save();
  res.send(event);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  const category = await Category.findById(req.body.categoryId);
  const event = await Events.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        EventName: req.body.EventName,
    EventDescription: req.body.EventDescription,
    EventLocation: req.body.EventLocation,
    Active: req.body.Active,
    Adultticketprice: req.body.Adultticketprice,
    Childticketprice: req.body.Childticketprice,
    
        eventCategory: {
          _id: category._id,
          categoryName: category.categoryName
        }
      },
    },
    { new: true }
  );
  if (!event)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(event);
});

router.delete("/:id", async (req, res) => {
  const event = await Events.findByIdAndRemove(req.params.id);
  if (!event)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(event);
});

module.exports = router;
