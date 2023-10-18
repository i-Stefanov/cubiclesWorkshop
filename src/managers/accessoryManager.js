const Accessory = require("../models/Accessory");
// .create after Accessory is mongoose method for creating new record
exports.create = (accessoryData) => Accessory.create(accessoryData);
