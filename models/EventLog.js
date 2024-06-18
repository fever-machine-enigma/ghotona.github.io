const mongoose = require("mongoose");

const EventLogSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  events: [
    {
      corpus: String,
      event: String,
      timestamp: Date,
    },
  ],
});

const EventLog = mongoose.model("EventLog", EventLogSchema);
