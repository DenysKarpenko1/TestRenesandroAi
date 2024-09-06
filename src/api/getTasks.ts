import { mockTasks } from "../mock/mockData";
import { Task } from "@/types/task";

export const getTasks = async (): Promise<Task[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockTasks]);
    }, 1000);
  });
};
