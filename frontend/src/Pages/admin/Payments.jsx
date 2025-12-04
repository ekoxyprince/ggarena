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

function Payments() {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const rowsPerPage = 10;

  const { data: response, isLoading } = useFetch({
    key: `admin-payments-${page}-${search}`,
    url: `/api/admin/payments?page=${page}&limit=${rowsPerPage}&search=${encodeURIComponent(
      search
    )}`,
  });

  const payments = response?.items || [];
  const pagination = response?.pagination;

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-slate-100">Payments</h2>
      <div className="w-full bg-[#020617] rounded-2xl p-4 border border-slate-800 shadow-sm overflow-x-auto space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">Monitor payment activity</p>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search by name, email, reference, or status..."
            className="w-full max-w-xs rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <Table aria-label="Payments table">
          <TableHeader>
            <TableColumn>AMOUNT (NGN)</TableColumn>
            <TableColumn>FULLNAME</TableColumn>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>REFERENCE</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>ORDER ID</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            emptyContent={
              isLoading ? "Loading payments..." : "No payments to display."
            }
          >
            {payments.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p.amount}</TableCell>
                <TableCell>{p.fullname}</TableCell>
                <TableCell>{p.email}</TableCell>
                <TableCell>{p.reference}</TableCell>
                <TableCell>{p.status}</TableCell>
                <TableCell>{p.order}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end mt-4">
          <Pagination
            isDisabled={isLoading || !pagination}
            page={page}
            total={pagination?.totalPages || 1}
            onChange={setPage}
            showControls
            size="sm"
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}

export default Payments;
