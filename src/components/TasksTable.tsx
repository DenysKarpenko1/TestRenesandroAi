import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Task } from "@/types/task";
import Link from "next/link";

const columns = [
  { key: "name", label: "Task name" },
  { key: "dimension", label: "Dimension" },
  { key: "templateId", label: "Template ID" },
  { key: "images", label: "Images" },
  { key: "text", label: "Text" },
  { key: "amount", label: "Amount" },
  { key: "genType", label: "Gen type" },
  { key: "genTasks", label: "Gen tasks" },
  { key: "resultAds", label: "Result Ads" },
];

const TableComponent = ({ tasks }: { tasks: Task[] }) => {
  return (
    <Table>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={tasks} emptyContent={"No tasks to display."}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              const data = item[columnKey as keyof Task];
              if (Array.isArray(data)) {
                return <TableCell>{data.length}</TableCell>;
              }
              return (
                <TableCell>
                  {columnKey === "name" ? (
                    <Link href={`/tasks/${item.id}`}>{data}</Link>
                  ) : (
                    data
                  )}
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
export default TableComponent;
