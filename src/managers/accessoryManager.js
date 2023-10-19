const Accessory = require("../models/Accessory");
exports.getAll = async () => Accessory.find().lean();
// .create after Accessory is mongoose method for creating new record
exports.create = (accessoryData) => Accessory.create(accessoryData);
// get all accessories that don't have the id of any of the attached ones to this cube
exports.getNotOwned = (accessoryIds) =>
  Accessory.find({ _id: { $nin: accessoryIds } }).lean();
