const express = require("express");
const router = express.Router();
const { Customer } = require("../models/customerModule");
const { Events } = require("../models/eventModule");
const {Registration,Validate} = require("../models/eventRegistration");

router.get("/", async (req, res) => {
  const registrations = await Registration.find();
  res.send(registrations);
});
router.get("/:id", async (req, res) => {
  const registration = await Registration.findById(req.params.id);
  if (!registration)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(registration);
});
router.post("/", async (req, res) => {
  console.log(req.body.amount);
  const { error } = Validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");
 // console.log(customer)
  const event = await Events.findById(req.body.eventId);
  if (!event) return res.status(400).send("Invalid event.");
 // console.log(event)

  let eventreg = new Registration({
    customer: {
      _id: customer._id,
      name: customer.name,
      phoneNumber: customer.phoneNumber,
      isMember:customer.isMember
    },
    event: {
      _id: event._id,
      EventName: event.EventName    
    },
    amount :req.body.amount
  
  });
console.log(eventreg)
  eventreg = await eventreg.save();
  res.send(eventreg);
});

// router.put("/:id", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(404).send(error.details[0].message);
//   const category = await Category.findById(req.body.categoryId);
//   const event = await Events.findByIdAndUpdate(
//     req.params.id,
//     {
//       $set: {
//         EventName: req.body.EventName,
//         EventDescription: req.body.EventDescription,
//         EventLocation: req.body.EventLocation,
//         Active: req.body.Active,
//         Adultticketprice: req.body.Adultticketprice,
//         Childticketprice: req.body.Childticketprice,

//         eventCategory: {
//           _id: category._id,
//           categoryName: category.categoryName,
//         },
//       },
//     },
//     { new: true }
//   );
//   if (!event)
//     return res
//       .status(404)
//       .send("The customer with the given ID was not found.");

//   res.send(event);
// });

// router.delete("/:id", async (req, res) => {
//   const event = await Events.findByIdAndRemove(req.params.id);
//   if (!event)
//     return res
//       .status(404)
//       .send("The customer with the given ID was not found.");
//   res.send(event);
// });

module.exports = router;
