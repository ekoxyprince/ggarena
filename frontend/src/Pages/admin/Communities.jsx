import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Pagination } from "@heroui/react";
import useFetch from "../../hooks/useFetch";
import { patch } from "../../utils/api";
import toast from "react-hot-toast";

function Communities() {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const rowsPerPage = 10;

  const { data: response, isLoading, refetch } = useFetch({
    key: `admin-communities-${page}-${search}`,
    url: `/api/admin/communities?page=${page}&limit=${rowsPerPage}&search=${encodeURIComponent(
      search
    )}`,
  });

  const communities = response?.items || [];
  const pagination = response?.pagination;
  const [updatingId, setUpdatingId] = React.useState(null);

  const toggleStatus = async (community) => {
    try {
      setUpdatingId(community._id);
      await patch(`/api/admin/communities/${community._id}/status`, {
        isVerified: !community.isVerified,
      });
      toast.success("Community status updated");
      await refetch();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-slate-100">Communities</h2>
      <div className="w-full bg-[#020617] rounded-2xl p-4 border border-slate-800 shadow-sm overflow-x-auto space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">Verify and manage communities</p>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search by community name..."
            className="w-full max-w-xs rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <Table aria-label="Communities table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>MEMBERS</TableColumn>
            <TableColumn>CREATED BY</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>CREATED AT</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            emptyContent={
              isLoading ? "Loading communities..." : "No communities to display."
            }
          >
            {communities.map((c) => (
              <TableRow key={c._id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.participants?.length || 0}</TableCell>
                <TableCell>{c.createdBy?.fullname || "-"}</TableCell>
                <TableCell>{c.isVerified ? "Verified" : "Not verified"}</TableCell>
                <TableCell>
                  {c.createdAt ? new Date(c.createdAt).toLocaleString() : "-"}
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    disabled={updatingId === c._id}
                    onClick={() => toggleStatus(c)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold ${
                      c.isVerified
                        ? "bg-red-500/80 text-white"
                        : "bg-emerald-500/80 text-white"
                    } disabled:opacity-60`}
                  >
                    {updatingId === c._id
                      ? "Updating..."
                      : c.isVerified
                      ? "Deactivate"
                      : "Activate"}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end mt-4">
          <Pagination
            isDisabled={isLoading || !pagination}
            page={page}
            total={pagination?.totalPages || 1}
            onChange={(newPage) => {
              setPage(newPage);
              refetch();
            }}
            showControls
            size="sm"
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}

export default Communities;
