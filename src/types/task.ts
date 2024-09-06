export interface Layer {
  image: string;
  dimension: string;
  flow: string;
  style: string;
  prompts: string;
  generates: string;
  visible: boolean;
}

export interface Task {
  id: number;
  name: string;
  dimension: string;
  flow: string;
  templateId: string;
  images: number;
  text: string;
  amount: string;
  genType: string;
  genTasks: string;
  resultAds: string;
  layers: Layer[];
}

export interface FormTask extends Omit<Task, "id" | "genTasks" | "resultAds"> {}
