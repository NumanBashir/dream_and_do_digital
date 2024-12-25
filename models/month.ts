import { Schema, model, models } from "mongoose";

const MonthSchema = new Schema({
  monthNumber: {
    type: Number,
    required: [true, "Month number is required"],
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
  },
  weeks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Week",
    },
  ],
  goals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Goal",
    },
  ],
  challenges: [
    {
      type: String,
    },
  ],
  rewards: [
    {
      type: String,
    },
  ],
  monthReflection: [
    {
      type: String,
    },
  ],
  yearRef: {
    type: Schema.Types.ObjectId,
    ref: "Year",
  },
});

// Middleware til at finde det tilhørende år
MonthSchema.pre("save", async function (next) {
  const Year = models.Year || model("Year");

  let year = await Year.findOne({ yearNumber: this.year });

  if (!year) {
    year = new Year({ yearNumber: this.year });
    await year.save();
  }

  this.yearRef = year._id; // Sæt reference til år
  next();
});

const Month = models.Month || model("Month", MonthSchema);

export default Month;
