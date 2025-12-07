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
import DashboardCard from "../../Components/DashboardCard";
import { IoGameController } from "react-icons/io5";
import useFetch from "../../hooks/useFetch";
import { post, patch, del } from "../../utils/api";
import toast from "react-hot-toast";
import CustomModal from "../../Components/ui/CustomModal";

function Games() {
  const { data, isLoading, refetch } = useFetch({
    key: "admin-games",
    url: "/api/games",
  });

  const allGames = data || [];
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const rowsPerPage = 10;
  const filteredGames = allGames.filter((g) =>
    search ? g.name?.toLowerCase().includes(search.toLowerCase()) : true
  );
  const totalPages = Math.max(1, Math.ceil(filteredGames.length / rowsPerPage));
  const games = filteredGames.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const [form, setForm] = React.useState({ name: "", image: "" });
  const [editing, setEditing] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({ name: "", image: "" });
    setEditing(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.image) {
      toast.error("Please fill in both name and image.");
      return;
    }
    try {
      setSubmitting(true);
      if (editing) {
        await patch(`/api/games/${editing._id}`, form);
        toast.success("Game updated");
      } else {
        await post("/api/games", form);
        toast.success("Game created");
      }
      await refetch();
      closeModal();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (game) => {
    setEditing(game);
    setForm({ name: game.name, image: game.image });
    setIsModalOpen(true);
  };

  const handleDelete = async (game) => {
    if (!window.confirm(`Are you sure you want to delete "${game.name}"?`)) {
      return;
    }
    try {
      setDeletingId(game._id);
      await del(`/api/games/${game._id}`);
      toast.success("Game deleted");
      await refetch();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-slate-100">Games</h2>
        <button
          type="button"
          onClick={openCreateModal}
          className="self-start rounded-md bg-primary px-4 py-2 text-sm font-semibold text-secondary hover:opacity-90"
        >
          Add game
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 md:gap-2 lg:gap-4">
        <DashboardCard
          title={"Total Games"}
          value={games.length || 0}
          Icon={IoGameController}
        />
      </div>

      {/* Games table */}
      <div className="w-full bg-[#020617] flex flex-col space-y-4 rounded-2xl p-4 border border-slate-800 shadow-sm overflow-x-auto">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">List of games available on the platform</p>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search games by name..."
            className="w-full max-w-xs rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <Table aria-label="Games table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>IMAGE</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            emptyContent={
              isLoading ? "Loading games..." : "No games to display."
            }
          >
            {games.map((game) => (
              <TableRow key={game._id}>
                <TableCell>{game.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-slate-800">
                      {game.image ? (
                        <img
                          src={game.image}
                          alt={game.name}
                          className="w-full h-full object-cover object-center"
                        />
                      ) : (
                        <span className="text-[10px] text-slate-400 flex items-center justify-center w-full h-full">
                          No image
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(game)}
                      className="px-3 py-1 rounded-md bg-primary text-secondary text-xs font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      disabled={deletingId === game._id}
                      onClick={() => handleDelete(game)}
                      className="px-3 py-1 rounded-md bg-red-600 text-white text-xs font-semibold disabled:opacity-60"
                    >
                      {deletingId === game._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </TableCell>
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

      {/* Create / Edit modal */}
      <CustomModal
        isOpen={isModalOpen}
        onOpenChange={(open) => {
          if (!open) closeModal();
        }}
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-100">
            {editing ? "Edit game" : "Create new game"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Game name"
              className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary"
            />
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-3 py-2 rounded-md border border-gray-600 text-xs text-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 rounded-md bg-primary text-secondary text-sm font-semibold disabled:opacity-60"
              >
                {submitting ? "Saving..." : editing ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </CustomModal>
    </div>
  );
}

export default Games;
