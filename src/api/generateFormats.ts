import { FormTask } from "@/types/task";

const API_USERNAME = process.env.NEXT_PUBLIC_API_USERNAME;
const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;

export const generateFormats = async (task: FormTask) => {
  const response = await fetch(
    "https://tz-front-jvqis72guq-lm.a.run.app/tz-front/generate_formats",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${API_USERNAME}:${API_PASSWORD}`),
      },
      body: JSON.stringify({
        task_name: task.name,
        dimension: task.dimension,
        template_id: task.templateId,
        amount: parseInt(task.amount, 10),
        gen_type: task.genType,
        image_layers: task.layers.map((layer) => layer.image),
        text_layers: task.layers.map((layer) => layer.prompts),
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to generate images: ${response.statusText}`);
  }

  return response.json();
};
