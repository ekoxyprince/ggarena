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

function Orders() {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const rowsPerPage = 10;

  const { data: response, isLoading, refetch } = useFetch({
    key: `admin-orders-${page}-${search}`,
    url: `/api/admin/orders?page=${page}&limit=${rowsPerPage}&search=${encodeURIComponent(
      search
    )}`,
  });

  const orders = response?.items || [];
  const pagination = response?.pagination;
  const [updatingId, setUpdatingId] = React.useState(null);

  const completeOrder = async (order) => {
    try {
      setUpdatingId(order._id);
      await patch(`/api/admin/orders/${order._id}/status`, {
        status: "completed",
      });
      toast.success("Order marked as completed");
      await refetch();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-slate-100">Orders</h2>
      <div className="w-full bg-[#020617] rounded-2xl p-4 border border-slate-800 shadow-sm overflow-x-auto space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">Track and update orders</p>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search by status (pending, completed)..."
            className="w-full max-w-xs rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <Table aria-label="Orders table">
          <TableHeader>
            <TableColumn>AMOUNT (NGN)</TableColumn>
            <TableColumn>COMMUNITY</TableColumn>
            <TableColumn>PRODUCT</TableColumn>
            <TableColumn>QTY</TableColumn>
            <TableColumn>ORDER STATUS</TableColumn>
            <TableColumn>PAYMENT STATUS</TableColumn>
            <TableColumn>PAYMENT REF</TableColumn>
            <TableColumn>FULLNAME</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            emptyContent={
              isLoading ? "Loading orders..." : "No orders to display."
            }
          >
            {orders.map((o) => (
              <TableRow key={o._id}>
                <TableCell>{o.totalAmount}</TableCell>
                <TableCell>{o.community?.name || "-"}</TableCell>
                <TableCell>{o.product?.name || "-"}</TableCell>
                <TableCell>{o.quantity}</TableCell>
                <TableCell className="capitalize">{o.status}</TableCell>
                <TableCell className="capitalize">
                  {o.payment?.status || "-"}
                </TableCell>
                <TableCell>{o.payment?.reference || "-"}</TableCell>
                <TableCell>{o.payment?.fullname || "-"}</TableCell>
                <TableCell>
                  {o.status === "pending" ? (
                    <button
                      type="button"
                      disabled={updatingId === o._id}
                      onClick={() => completeOrder(o)}
                      className="px-3 py-1 rounded-md bg-emerald-500/80 text-white text-xs font-semibold disabled:opacity-60"
                    >
                      {updatingId === o._id ? "Updating..." : "Complete"}
                    </button>
                  ) : (
                    <span className="text-xs text-gray-300">Completed</span>
                  )}
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

export default Orders;
