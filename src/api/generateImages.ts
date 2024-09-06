import { FormTask } from "@/types/task";

const API_USERNAME = process.env.NEXT_PUBLIC_API_USERNAME;
const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;

export const generateImages = async (task: FormTask) => {
  const response = await fetch(
    "https://tz-front-jvqis72guq-lm.a.run.app/tz-front/generate_images",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${API_USERNAME}:${API_PASSWORD}`),
      },
      body: JSON.stringify({
        assigned_task_name: task.name,
        layer_name: task.layers.map((layer) => layer.style).join(", "),
        images: task.layers.map((layer) => layer.image),
        dimension: task.dimension,
        style: task.layers.map((layer) => layer.style).join(", "),
        manual_prompts: task.layers.map((layer) => layer.prompts).join(", "),
        gen_per_ref: parseInt(task.amount, 10),
        flow: task.flow,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to generate tasks: ${response.statusText}`);
  }

  return response.json();
};
