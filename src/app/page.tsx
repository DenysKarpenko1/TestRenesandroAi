"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Table from "../components/TasksTable";
import { getTasks } from "@/api/getTasks";
import { Task } from "@/types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const taskData = await getTasks();
      setTasks(taskData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <Link href="/tasks/create" passHref>
            <Button color="primary" variant="solid">
              Create Task
            </Button>
          </Link>
        </div>
        {isLoading ? <div>Loading...</div> : <Table tasks={tasks} />}
      </div>
    </main>
  );
}
