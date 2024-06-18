const EventLog = require("../models/EventLog");

module.exports.get_log = async (req, res) => {
  try {
    const logs = await EventLog.find({});
    res.status(201).json(logs);
  } catch (err) {
    res.status(400).json("Error occurred.");
  }
};
