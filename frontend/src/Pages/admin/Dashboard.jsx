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
import useFetch from "../../hooks/useFetch";

function Dashboard() {
  const { data, isLoading } = useFetch({
    key: "admin-dashboard",
    url: "/api/admin/dashboard",
  });

  const stats = data || {};
  const latestUsers = stats.latestUsers || [];

  return (
    <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 md:gap-4 lg:gap-6">
        <DashboardCard
          Icon={FaUsers}
          title={"Total Users"}
          value={stats.totalUsers || 0}
          subText={`Today: ${stats.usersToday || 0}`}
        />
        <DashboardCard
          Icon={RiCommunityLine}
          title={"Total Communities"}
          value={stats.totalCommunities || 0}
          subText={`Today: ${stats.communitiesToday || 0}`}
        />
        <DashboardCard
          Icon={IoMdCart}
          title={"Total Orders"}
          value={stats.totalOrders || 0}
          subText={`Today: ${stats.ordersToday || 0}`}
        />
        <DashboardCard
          Icon={TbTournament}
          title={"Tournaments"}
          value={stats.totalTournaments || 0}
          subText={`Today: ${stats.tournamentsToday || 0}`}
        />
      </div>
      <div className="w-full bg-[#020617] flex flex-col space-y-4 rounded-2xl p-4 border border-slate-800 shadow-sm overflow-x-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-100">Last 10 registered users</h2>
        <Table aria-label="Latest users table">
          <TableHeader>
            <TableColumn>FULLNAME</TableColumn>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>JOINED AT</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            emptyContent={
              isLoading ? "Loading users..." : "No recent users to display."
            }
          >
            {latestUsers.map((u) => (
              <TableRow key={u._id}>
                <TableCell>{u.fullname}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell className="capitalize">{u.status}</TableCell>
                <TableCell>
                  {u.createdAt ? new Date(u.createdAt).toLocaleString() : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Dashboard;
