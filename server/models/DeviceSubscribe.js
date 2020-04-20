const mongoose = require("mongoose");

const DeviceSubscribeSchema = new mongoose.Schema({
  subscription: {
    type: Object,
    required: true
  },

  endpoint: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = User = mongoose.model(
  "deviceNotification",
  DeviceSubscribeSchema
);
