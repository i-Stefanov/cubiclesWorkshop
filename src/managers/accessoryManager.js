const Accessory = require("../models/Accessory");
exports.getAll = async () => Accessory.find().lean();
// .create after Accessory is mongoose method for creating new record
exports.create = (accessoryData) => Accessory.create(accessoryData);
