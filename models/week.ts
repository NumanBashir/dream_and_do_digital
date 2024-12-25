import { Schema, model, models } from "mongoose";

const WeekSchema = new Schema({
  weekNumber: {
    type: Number,
    required: [true, "Week number is required"],
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
  },
  days: [
    {
      type: Schema.Types.ObjectId,
      ref: "Day", // Reference til Days
    },
  ],
  month: {
    type: Schema.Types.ObjectId,
    ref: "Month", // Reference til Month
  },
  goals: [
    {
      type: String, // Goals som tekst
    },
  ],
});

const Week = models.Week || model("Week", WeekSchema);

export default Week;
