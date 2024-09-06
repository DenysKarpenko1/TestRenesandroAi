import { FormTask } from "@/types/task";
import { Task } from "@/types/task";
import { mockTasks } from "../mock/mockData";

export const createTask = async (taskData: FormTask): Promise<Task> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (taskData) {
        const newTask: Task = {
          id: mockTasks.length + 1,
          name: taskData.name,
          dimension: taskData.dimension,
          templateId: taskData.templateId,
          images: taskData.images,
          text: taskData.text,
          amount: taskData.amount,
          genType: taskData.genType,
          genTasks: "Generate",
          resultAds: "Folder",
          flow: taskData.flow,
          layers: taskData.layers,
        };

        mockTasks.push(newTask);
        resolve(newTask);
      } else {
        reject("Task creation failed");
      }
    }, 1000);
  });
};
