import { Schema, model, models } from "mongoose";
import { getISOWeek, getYear } from "date-fns";

const DaySchema = new Schema({
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "todos",
    },
  ],
  reflection: {
    type: String,
    default: "",
  },
  mood: {
    type: String,
    enum: ["🤩", "😀", "😐", "😢", "😡"],
    default: "😐",
  },
  week: {
    type: Schema.Types.ObjectId,
    ref: "Week", // Dynamisk reference til uge
  },
});

// Middleware til at finde den tilhørende uge
DaySchema.pre("save", async function (next) {
  const weekNumber = getISOWeek(this.date);
  const year = getYear(this.date);

  // Find eller opret den uge, som dagen tilhører
  const Week = models.Week || model("Week");
  let week = await Week.findOne({ weekNumber, year });

  if (!week) {
    week = new Week({ weekNumber, year });
    await week.save();
  }

  this.week = week._id; // Sæt reference til uge
  next();
});

const Day = models.Day || model("Day", DaySchema);

export default Day;
