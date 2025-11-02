import React from "react";
import DashboardCard from "../../Components/DashboardCard";
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
import BarChart from "../../Components/ui/BarChart";
import { FaUsers } from "react-icons/fa6";
import { RiCommunityLine } from "react-icons/ri";
import { IoMdCart } from "react-icons/io";
import { TbTournament } from "react-icons/tb";

function Dashboard() {
  return (
    <div className="flex flex-col space-y-2 md:space-y-4 lg:space-y-8">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 md:gap-2 lg:gap-4">
        <DashboardCard Icon={FaUsers} title={"Total Users"} value={200} />
        <DashboardCard
          Icon={RiCommunityLine}
          title={"Total Communities"}
          value={200}
        />
        <DashboardCard Icon={IoMdCart} title={"Total Orders"} value={200} />
        <DashboardCard
          Icon={TbTournament}
          title={"Active Tournaments"}
          value={200}
        />
      </div>
      <div className="flex flex-col gap-2 md:flex-row md:gap-4">
        <BarChart />
        <BarChart />
      </div>
      <div className="w-full bg-[#18181b] flex flex-col space-y-4 rounded-xl p-2">
        <h2>Last 10 registered users</h2>
        <Table aria-label="Example empty table">
          <TableHeader>
            <TableColumn>fullname</TableColumn>
            <TableColumn>email</TableColumn>
            <TableColumn>status</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        </Table>
        <Pagination className="ml-auto" initialPage={1} total={10} />
      </div>
    </div>
  );
}

export default Dashboard;
