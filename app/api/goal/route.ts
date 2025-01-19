import Goal from "@/models/goal";
import { connectToDB } from "@/utils/database";

export const GET = async () => {
  try {
    await connectToDB();
    const goals = await Goal.find(); // Fetch all goals
    return Response.json(goals, { status: 200 });
  } catch (error) {
    console.error("Error fetching goals:", error);
    return Response.json({ message: "Failed to fetch goals" }, { status: 500 });
  }
};
