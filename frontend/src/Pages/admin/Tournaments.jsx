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
import { Images } from "../../assets/Images";
import CustomModal from "../../Components/ui/CustomModal";
import { post, patch, get } from "../../utils/api";
import toast from "react-hot-toast";

function Tournaments() {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const rowsPerPage = 10;

  const { data: response, isLoading, refetch } = useFetch({
    key: `admin-tournaments-${page}-${search}`,
    url: `/api/admin/tournaments?page=${page}&limit=${rowsPerPage}&search=${encodeURIComponent(
      search
    )}`,
  });

  const tournaments = response?.items || [];
  const pagination = response?.pagination;

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    mode: "",
    game: "",
    hostedBy: "",
    totalParticipants: "",
    price: "",
    currency: "NGN",
    overview: "",
    rules: "",
    image: "",
    status: "scheduled",
    isActive: true,
  });
  const [games, setGames] = React.useState([]);
  const [communities, setCommunities] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const gamesRes = await get("/api/games");
        setGames(gamesRes?.data || gamesRes || []);
      } catch (e) {
        // ignore
      }
      try {
        const commRes = await get(
          "/api/admin/communities?page=1&limit=1000&search="
        );
        setCommunities(commRes?.data?.items || []);
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      mode: "",
      game: "",
      hostedBy: "",
      totalParticipants: "",
      price: "",
      currency: "NGN",
      overview: "",
      rules: "",
      image: "",
      status: "scheduled",
      isActive: true,
    });
    setEditing(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (t) => {
    setEditing(t);
    setForm({
      name: t.name || "",
      mode: t.mode || "",
      game: t.game?._id || t.game || "",
      hostedBy: t.hostedBy?._id || t.hostedBy || "",
      totalParticipants: t.totalParticipants?.toString() || "",
      price: t.price?.toString() || "",
      currency: t.currency || "NGN",
      overview: t.overview || "",
      rules: t.rules || "",
      image: t.image || "",
      status: t.status || "scheduled",
      isActive: t.isActive ?? true,
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const payload = {
        ...form,
        totalParticipants: form.totalParticipants
          ? Number(form.totalParticipants)
          : undefined,
        price: form.price ? Number(form.price) : undefined,
      };
      if (editing) {
        await patch(`/api/admin/tournaments/${editing._id}`, payload);
        toast.success("Tournament updated");
      } else {
        await post("/api/admin/tournaments", payload);
        toast.success("Tournament created");
      }
      setIsModalOpen(false);
      resetForm();
      await refetch();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-slate-100">Tournaments</h2>
        <button
          type="button"
          onClick={openCreateModal}
          className="self-start rounded-md bg-primary px-4 py-2 text-sm font-semibold text-secondary hover:opacity-90"
        >
          Create tournament
        </button>
      </div>
      <div className="w-full bg-[#020617] rounded-2xl p-4 border border-slate-800 shadow-sm overflow-x-auto space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">Overview of active and past tournaments</p>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search by name or status..."
            className="w-full max-w-xs rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <Table aria-label="Tournaments table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>PARTICIPANTS</TableColumn>
            <TableColumn>HOSTED BY</TableColumn>
            <TableColumn>MEMBERS</TableColumn>
            <TableColumn>PRIZE</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>CREATED AT</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            emptyContent={
              isLoading ? "Loading tournaments..." : "No tournaments to display."
            }
          >
            {tournaments.map((t) => (
              <TableRow key={t._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md overflow-hidden bg-slate-800 shrink-0">
                      <img
                        src={t.image || t.cover || Images.turna}
                        alt={t.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-100">
                      {t.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{t.participants?.length || 0}</TableCell>
                <TableCell>{t.hostedBy?.name || "-"}</TableCell>
                <TableCell>
                  {(t.participants?.length || 0) + "/" + (t.totalParticipants || 0)}
                </TableCell>
                <TableCell>
                  {t.currency} {t.price}
                </TableCell>
                <TableCell className="capitalize">{t.status}</TableCell>
                <TableCell>
                  {t.createdAt ? new Date(t.createdAt).toLocaleString() : "-"}
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    onClick={() => openEditModal(t)}
                    className="px-3 py-1 rounded-md bg-slate-700 text-slate-100 text-xs font-semibold"
                  >
                    Edit
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
            onChange={setPage}
            showControls
            size="sm"
            color="primary"
          />
        </div>
      </div>

      {/* Create / Edit tournament modal */}
      <CustomModal
        isOpen={isModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsModalOpen(false);
            resetForm();
          }
        }}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h3 className="text-lg font-semibold text-slate-100">
            {editing ? "Edit tournament" : "Create new tournament"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleFormChange}
                className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Mode</label>
              <input
                name="mode"
                value={form.mode}
                onChange={handleFormChange}
                className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Game</label>
              <select
                name="game"
                value={form.game}
                onChange={handleFormChange}
                className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary"
              >
                <option value="">Select game</option>
                {games.map((g) => (
                  <option key={g._id} value={g._id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Community</label>
              <select
                name="hostedBy"
                value={form.hostedBy}
                onChange={handleFormChange}
                className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary"
              >
                <option value="">Select community</option>
                {communities.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Total participants</label>
              <input
                type="number"
                name="totalParticipants"
                value={form.totalParticipants}
                onChange={handleFormChange}
                className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Entry / Prize amount</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleFormChange}
                className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Currency</label>
              <input
                name="currency"
                value={form.currency}
                onChange={handleFormChange}
                className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Banner image URL</label>
              <input
                name="image"
                value={form.image}
                onChange={handleFormChange}
                className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400">Overview</label>
            <textarea
              name="overview"
              rows={3}
              value={form.overview}
              onChange={handleFormChange}
              className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary resize-y"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400">Rules</label>
            <textarea
              name="rules"
              rows={3}
              value={form.rules}
              onChange={handleFormChange}
              className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary resize-y"
            />
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                id="isActive"
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleFormChange}
                className="w-4 h-4"
              />
              <label htmlFor="isActive" className="text-xs text-slate-400">
                Active
              </label>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleFormChange}
                className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary"
              >
                <option value="scheduled">scheduled</option>
                <option value="ongoing">ongoing</option>
                <option value="completed">completed</option>
                <option value="cancelled">cancelled</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
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
      </CustomModal>
    </div>
  );
}

export default Tournaments;
