import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@heroui/react";
import DashboardCard from "../../Components/DashboardCard";
import { FaPlaystation } from "react-icons/fa";

function Platforms() {
  return (
    <div className="flex flex-col space-y-8">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 md:gap-2 lg:gap-4">
        <DashboardCard
          title={"Total Platforms"}
          value={2}
          Icon={FaPlaystation}
        />
      </div>
      <div className="w-full bg-[#18181b] flex flex-col space-y-4 rounded-xl">
        <Table aria-label="Example empty table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        </Table>
        <Pagination className="ml-auto" initialPage={1} total={10} />
      </div>
    </div>
  );
}

export default Platforms;
