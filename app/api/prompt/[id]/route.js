import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//Get one prompt
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found!", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt.", { status: 500 });
  }
};

//Update prompt
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();
    //find prompt
    const existingPrompt = await Prompt.findById(params.id);

    //if no prompt
    if (!existingPrompt) {
      return new Response("Prompt not found!", { status: 404 });
    }

    //update prompt
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Fail to update the prompt", { status: 500 });
  }
};

//Delete

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Can not delete!", { status: 500 });
  }
};
