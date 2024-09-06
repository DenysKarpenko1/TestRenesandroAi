"use client";

import { useRouter } from "next/navigation";
import TaskForm from "@/components/TaskForm";
import { generateImages } from "@/api/generateImages";
import { generateFormats } from "@/api/generateFormats";
import { FormTask } from "@/types/task";
import { createTask } from "@/api/createTask";
import { Button, Link } from "@nextui-org/react";

export default function CreateTaskPage() {
  const router = useRouter();

  const handleSave = async (task: FormTask) => {
    try {
      await createTask(task);
      await generateImages(task);
      await generateFormats(task);

      router.push("/");
    } catch (error) {
      console.error("Error generating task or image:", error);
    }
  };

  return (
    <main>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex justify-end items-end">
          <Button color="primary" variant="solid" as={Link} href="/">
            Back to Home
          </Button>
        </div>
      </div>
      <TaskForm onSave={handleSave} />
    </main>
  );
}
