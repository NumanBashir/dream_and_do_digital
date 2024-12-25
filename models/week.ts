import { Schema, SchemaType, model, models } from "mongoose";

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
      ref: "Day",
    },
  ],
  month: {
    type: Schema.Types.ObjectId,
    ref: "Month",
  },
  goals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Goal",
    },
  ],
});

const Week = models.Week || model("Week", WeekSchema);

export default Week;
