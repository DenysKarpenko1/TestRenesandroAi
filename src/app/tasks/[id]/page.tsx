"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import { Button, Link } from "@nextui-org/react";
import { Task, FormTask } from "@/types/task";
import { getTask } from "@/api/getTask";
import { editTask } from "@/api/editTask";
import TaskForm from "@/components/TaskForm";
import { generateImages } from "@/api/generateImages";
import { generateFormats } from "@/api/generateFormats";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTask = useCallback(async () => {
    try {
      if (Number.isNaN(id)) {
        throw new Error("Invalid ID");
      }
      const task = await getTask(id);
      setTask(task);
    } catch (error) {
      console.error("Error fetching task:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const handleSave = async (task: FormTask) => {
    try {
      await editTask(id, task);
      await generateImages(task);
      await generateFormats(task);

      router.push("/");
    } catch (error) {
      console.error("Error generating task or image:", error);
    }
  };

  if (!isLoading && !task) {
    return notFound();
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex justify-end items-end">
          <Button color="primary" variant="solid" as={Link} href="/">
            Back to Home
          </Button>
        </div>
      </div>
      <TaskForm initialData={task as Task} onSave={handleSave} />
    </main>
  );
}
