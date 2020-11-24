const mongoose = require("mongoose");
const Joi = require("joi");

const eventCategorySchema = new mongoose.Schema({
  categoryName: String,
  categoryDesc: String,
  active: Boolean,
});

const Category = mongoose.model("Category",eventCategorySchema);

function validateCategory(categories) {
  const schema = Joi.object({
    categoryName: Joi.string().min(5).required(),
    categoryDesc: Joi.string().min(5).required(),
    active: Joi.boolean(),
   
  });
  return schema.validate(categories);
}

module.exports.Category = Category;
module.exports.CategorySchema = eventCategorySchema;
module.exports.validate = validateCategory;
