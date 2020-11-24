const mongoose = require("mongoose");
const Joi = require("joi");
const { CategorySchema } = require("./eventCategories");

const Events = mongoose.model(
  "Event",
  new mongoose.Schema({
    EventName: String,
    EventDescription: String,
    EventLocation: String,
    Active: Boolean,
    Adultticketprice: String,
    Childticketprice: String,
    eventCategory: CategorySchema,
  })
);

function validateCustomer(events) {
  const schema = Joi.object({
    EventName: Joi.string().min(5).required(),
    EventDescription: Joi.string().min(5).required(),
    EventLocation: Joi.string().min(5).required(),
    categoryId: Joi.string().required(),
    Active: Joi.boolean(),
    Adultticketprice: Joi.string().required(),
    Childticketprice: Joi.string().required(),
  });
  return schema.validate(events);
}

module.exports.Events = Events;
module.exports.validate = validateCustomer;
