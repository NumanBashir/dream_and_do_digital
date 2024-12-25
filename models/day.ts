import { Schema, model, models } from "mongoose";
import { getISOWeek, getMonth, getYear } from "date-fns";
import Week from "@/models/week";

const DaySchema = new Schema({
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "todos", // Refererer til 'todos'-collectionen
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
    ref: "Week", // Reference til en uge (du skal oprette Week-model)
  },
});

DaySchema.pre("save", async function (next) {
  const weekNumber = getISOWeek(this.date); // Beregn ugenummer
  const year = getYear(this.date); // Beregn året

  // Find eller opret uge
  let week = await Week.findOne({ weekNumber, year });
  if (!week) {
    week = new Week({ weekNumber, year, days: [] });
    await week.save();
  }

  // Sæt week til Week's _id
  this.week = week._id;

  next();
});

const Day = models.Day || model("days", DaySchema);

export default Day;
