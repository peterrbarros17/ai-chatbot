import { HfInference } from "@huggingface/inference";
import { HuggingFaceStream, StreamingTextResponse } from "ai";

const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const runtime = "edge";

export async function POST(req: Response) {
  const { prompt } = await req.json();
  const response = Hf.textGenerationStream({
    model: "OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
    inputs: `<|prompter|>${prompt}<|endoftext|><|assistant|>`,
    parameters: {
      max_new_tokens: 200,
      // @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
      typical_p: 0.2,
      repetition_penalty: 1,
      truncate: 1000,
      return_full_text: false,
    },
  });

  const stream = HuggingFaceStream(response);

  return new StreamingTextResponse(stream);
}
