import { Schema, model, models } from "mongoose";
import { getMonth } from "date-fns";

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
    ref: "Month", // Dynamisk reference til måned
  },
  weeklyGoals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Goal",
    },
  ],
  weeklyChallenges: [
    {
      type: String,
    },
  ],
});

// Middleware til at finde den tilhørende måned
WeekSchema.pre("save", async function (next) {
  const monthNumber =
    getMonth(new Date(this.year, 0, (this.weekNumber - 1) * 7)) + 1;

  // Find eller opret måneden
  const Month = models.Month || model("Month");
  let month = await Month.findOne({ monthNumber, year: this.year });

  if (!month) {
    month = new Month({ monthNumber, year: this.year });
    await month.save();
  }

  this.month = month._id; // Sæt reference til måned
  next();
});

const Week = models.Week || model("Week", WeekSchema);

export default Week;
