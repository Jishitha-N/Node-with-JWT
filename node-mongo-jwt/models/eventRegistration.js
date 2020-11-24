const mongoose = require("mongoose");
const Joi = require("joi");

const Events = mongoose.model(
  "Registration",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
        isMember: {
          type: Boolean,
          default: false,
        },
        phoneNumber: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
      }),
      required: true,
    },
    event: {
      type: new mongoose.Schema({
        EventName: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 255,
        },
      }),
      required: true,
    },
    dateCreated: {
      type: Date,
      required: true,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
      min:0,
      max:500
    },
  })
);

function validateUser(users) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    eventId: Joi.string().required(),
    amount: Joi.number().min(0).max(500).required(),
  });
  return schema.validate(users);
}
module.exports.Registration = Events;
module.exports.Validate = validateUser;
