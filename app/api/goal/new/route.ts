import Goal from "@/models/goal";
import { connectToDB } from "@/utils/database";

export const POST = async (req: Request) => {
  const { goalName } = await req.json();

  try {
    await connectToDB();
    const newGoal = new Goal({ goalName });

    await newGoal.save();
    return new Response(JSON.stringify(newGoal), { status: 201 });
  } catch (error) {
    console.error("Error creating goal:", error);
    return new Response("Failed to create goal", { status: 500 });
  }
};
