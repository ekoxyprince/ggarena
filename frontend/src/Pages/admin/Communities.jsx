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
import { patch, post } from "../../utils/api";
import toast from "react-hot-toast";
import { Images } from "../../assets/Images";
import CustomModal from "../../Components/ui/CustomModal";

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

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    image: "",
    cover: "",
    officialEmail: "",
    discordChannel: "",
    maxUsers: "",
    description: "",
    isVerified: false,
  });

  const resetForm = () => {
    setForm({
      name: "",
      image: "",
      cover: "",
      officialEmail: "",
      discordChannel: "",
      maxUsers: "",
      description: "",
      isVerified: false,
    });
    setEditing(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (community) => {
    setEditing(community);
    setForm({
      name: community.name || "",
      image: community.image || "",
      cover: community.cover || "",
      officialEmail: community.officialEmail || "",
      discordChannel: community.discordChannel || "",
      maxUsers: community.maxUsers?.toString() || "",
      description: community.description || "",
      isVerified: community.isVerified || false,
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
        maxUsers: form.maxUsers ? Number(form.maxUsers) : undefined,
      };
      if (editing) {
        await patch(`/api/admin/communities/${editing._id}`, payload);
        toast.success("Community updated");
      } else {
        await post("/api/admin/communities", payload);
        toast.success("Community created");
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-slate-100">Communities</h2>
        <button
          type="button"
          onClick={openCreateModal}
          className="self-start rounded-md bg-primary px-4 py-2 text-sm font-semibold text-secondary hover:opacity-90"
        >
          Create community
        </button>
      </div>
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
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md overflow-hidden bg-slate-800 shrink-0">
                      <img
                        src={c.image || c.cover || Images.community}
                        alt={c.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-100">
                      {c.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{c.participants?.length || 0}</TableCell>
                <TableCell>{c.createdBy?.fullname || "-"}</TableCell>
                <TableCell>{c.isVerified ? "Verified" : "Not verified"}</TableCell>
                <TableCell>
                  {c.createdAt ? new Date(c.createdAt).toLocaleString() : "-"}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col sm:flex-row gap-2">
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
                    <button
                      type="button"
                      onClick={() => openEditModal(c)}
                      className="px-3 py-1 rounded-md bg-slate-700 text-slate-100 text-xs font-semibold"
                    >
                      Edit
                    </button>
                  </div>
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

      {/* Create / Edit community modal */}
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
            {editing ? "Edit community" : "Create new community"}
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
              <label className="text-xs text-slate-400">Official email</label>
              <input
                name="officialEmail"
                value={form.officialEmail}
                onChange={handleFormChange}
                className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Discord channel</label>
              <input
                name="discordChannel"
                value={form.discordChannel}
                onChange={handleFormChange}
                className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Max users</label>
              <input
                type="number"
                name="maxUsers"
                value={form.maxUsers}
                onChange={handleFormChange}
                className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Logo image URL</label>
              <input
                name="image"
                value={form.image}
                onChange={handleFormChange}
                className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Cover image URL</label>
              <input
                name="cover"
                value={form.cover}
                onChange={handleFormChange}
                className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400">Description</label>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleFormChange}
              className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary resize-y"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="isVerified"
              type="checkbox"
              name="isVerified"
              checked={form.isVerified}
              onChange={handleFormChange}
              className="w-4 h-4"
            />
            <label htmlFor="isVerified" className="text-xs text-slate-400">
              Mark as verified
            </label>
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

export default Communities;
