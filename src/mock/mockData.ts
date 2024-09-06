import { Task } from "@/types/task";

export const mockTasks: Task[] = [
  {
    id: 1,
    name: "dasd",
    dimension: "9x16",
    templateId: "template1",
    images: 1,
    text: "dasd",
    amount: "1",
    genType: "type2",
    genTasks: "Generate",
    resultAds: "Folder",
    flow: "left",
    layers: [
      {
        image: "",
        dimension: "",
        flow: "",
        style: "",
        prompts: "",
        generates: "",
        visible: false,
      },
    ],
  },
];
