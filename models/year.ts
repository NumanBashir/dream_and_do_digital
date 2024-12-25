import { Schema, model, models } from "mongoose";

const YearSchema = new Schema({
  yearNumber: {
    type: Number,
    required: [true, "Year number is required"],
  },
  months: [
    {
      type: Schema.Types.ObjectId,
      ref: "Month",
    },
  ],
  yearlyGoals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Goal",
    },
  ],
});

const Year = models.Year || model("Year", YearSchema);

export default Year;
