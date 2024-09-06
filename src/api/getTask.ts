import { mockTasks } from "../mock/mockData";
import { Task } from "@/types/task";

export const getTask = async (id: number): Promise<Task | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTasks.find((task) => task.id === id) || null);
    }, 1000);
  });
};
