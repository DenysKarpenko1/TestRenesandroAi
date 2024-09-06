import { FormTask } from "@/types/task";
import { Task } from "@/types/task";
import { mockTasks } from "../mock/mockData";

export const editTask = async (
  id: number,
  taskData: FormTask
): Promise<Task> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const taskToEdit = mockTasks.find((task) => task.id === id);
      if (taskToEdit) {
        taskToEdit.name = taskData.name;
        taskToEdit.dimension = taskData.dimension;
        taskToEdit.templateId = taskData.templateId;
        taskToEdit.images = taskData.images;
        taskToEdit.text = taskData.text;
        taskToEdit.amount = taskData.amount;
        taskToEdit.genType = taskData.genType;
        taskToEdit.flow = taskData.flow;
        taskToEdit.layers = taskData.layers;
        resolve(taskToEdit);
      } else {
        reject("Task editing failed");
      }
    }, 1000);
  });
};
