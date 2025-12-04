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

const Products = () => {
  const { data, isLoading } = useFetch({
    key: "admin-products",
    url: "/api/products",
  });

  const allProducts = data || [];
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const rowsPerPage = 10;
  const filteredProducts = allProducts.filter((p) =>
    search ? p.name?.toLowerCase().includes(search.toLowerCase()) : true
  );
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / rowsPerPage));
  const products = filteredProducts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-slate-100">Products</h2>
      <div className="w-full bg-[#020617] rounded-2xl p-4 border border-slate-800 shadow-sm overflow-x-auto space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">Marketplace products across communities</p>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search products by name..."
            className="w-full max-w-xs rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <Table aria-label="Products table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>COMMUNITY</TableColumn>
            <TableColumn>PRICE</TableColumn>
            <TableColumn>CURRENCY</TableColumn>
            <TableColumn>CATEGORY</TableColumn>
            <TableColumn>BRAND</TableColumn>
            <TableColumn>STOCK</TableColumn>
            <TableColumn>ACTIVE</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            emptyContent={
              isLoading ? "Loading products..." : "No products to display."
            }
          >
            {products.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.community?.name || "-"}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell>{p.currency}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>{p.brand}</TableCell>
                <TableCell>{p.stockCount}</TableCell>
                <TableCell>{p.isActive ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end mt-4">
          <Pagination
            isDisabled={isLoading || totalPages <= 1}
            page={page}
            total={totalPages}
            onChange={(newPage) => {
              setPage(newPage);
            }}
            showControls
            size="sm"
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
