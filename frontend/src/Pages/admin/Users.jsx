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
import { patch, post } from "../../utils/api";
import toast from "react-hot-toast";

function Users() {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const rowsPerPage = 10;

  const { data: response, isLoading, refetch } = useFetch({
    key: `admin-users-${page}-${search}`,
    url: `/api/admin/users?page=${page}&limit=${rowsPerPage}&search=${encodeURIComponent(
      search
    )}`,
  });

  const users = response?.items || [];
  const pagination = response?.pagination;

  const [pointsModalOpen, setPointsModalOpen] = React.useState(false);
  const [emailModalOpen, setEmailModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [pointsForm, setPointsForm] = React.useState({ points: "", delta: "" });
  const [emailForm, setEmailForm] = React.useState({ subject: "", message: "" });
  const [savingPoints, setSavingPoints] = React.useState(false);
  const [sendingEmail, setSendingEmail] = React.useState(false);

  const openPointsModal = (user) => {
    setSelectedUser(user);
    setPointsForm({ points: user.points ?? "", delta: "" });
    setPointsModalOpen(true);
  };

  const openEmailModal = (user) => {
    setSelectedUser(user);
    setEmailForm({ subject: "", message: "" });
    setEmailModalOpen(true);
  };

  const handleSavePoints = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      setSavingPoints(true);
      const payload = {};
      if (pointsForm.points !== "" && !isNaN(pointsForm.points)) {
        payload.points = Number(pointsForm.points);
      }
      if (pointsForm.delta !== "" && !isNaN(pointsForm.delta)) {
        payload.delta = Number(pointsForm.delta);
      }
      if (
        payload.points === undefined &&
        payload.delta === undefined
      ) {
        toast.error("Enter a points value or delta to update.");
        setSavingPoints(false);
        return;
      }
      await patch(`/api/admin/users/${selectedUser._id}/points`, payload);
      toast.success("User points updated");
      setPointsModalOpen(false);
      await refetch();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSavingPoints(false);
    }
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      setSendingEmail(true);
      if (!emailForm.subject || !emailForm.message) {
        toast.error("Subject and message are required.");
        setSendingEmail(false);
        return;
      }
      await post(`/api/admin/users/${selectedUser._id}/email`, emailForm);
      toast.success("Email sent");
      setEmailModalOpen(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-slate-100">Users</h2>
      <div className="w-full bg-[#020617] rounded-2xl p-4 border border-slate-800 shadow-sm overflow-x-auto space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">Manage platform users</p>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search by name or email..."
            className="w-full max-w-xs rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <Table aria-label="Users table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>TOURNAMENTS CREATED</TableColumn>
            <TableColumn>COMMUNITIES JOINED</TableColumn>
            <TableColumn>TOURNAMENTS WON</TableColumn>
            <TableColumn>COMMUNITIES CREATED</TableColumn>
            <TableColumn>POINTS</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            emptyContent={
              isLoading ? "Loading users..." : "No users to display."
            }
          >
            {users.map((u) => (
              <TableRow key={u._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-800 shrink-0">
                      <img
                        src={u.profilePic || u.image || Images.avatar}
                        alt={u.fullname}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-100">
                      {u.fullname}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.tournamentsCreated}</TableCell>
                <TableCell>{u.communitiesJoined}</TableCell>
                <TableCell>{u.tournamentsWon}</TableCell>
                <TableCell>{u.communitiesCreated}</TableCell>
                <TableCell>{u.points ?? 0}</TableCell>
                <TableCell className="capitalize">{u.status}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => openPointsModal(u)}
                      className="px-2 py-1 rounded-md bg-primary text-secondary text-[11px] font-semibold"
                    >
                      Points
                    </button>
                    <button
                      type="button"
                      onClick={() => openEmailModal(u)}
                      className="px-2 py-1 rounded-md bg-slate-700 text-slate-100 text-[11px] font-semibold"
                    >
                      Email
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
            onChange={setPage}
            showControls
            size="sm"
            color="primary"
          />
        </div>
      </div>

      {/* Points modal */}
      <CustomModal
        isOpen={pointsModalOpen}
        onOpenChange={(open) => {
          if (!open) setPointsModalOpen(false);
        }}
      >
        {selectedUser && (
          <form className="space-y-4" onSubmit={handleSavePoints}>
            <h3 className="text-lg font-semibold text-slate-100">
              Update points for {selectedUser.fullname}
            </h3>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Set absolute points</label>
              <input
                type="number"
                value={pointsForm.points}
                onChange={(e) =>
                  setPointsForm((p) => ({ ...p, points: e.target.value }))
                }
                placeholder="e.g. 150"
                className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">
                Or apply delta (positive or negative)
              </label>
              <input
                type="number"
                value={pointsForm.delta}
                onChange={(e) =>
                  setPointsForm((p) => ({ ...p, delta: e.target.value }))
                }
                placeholder="e.g. 10 or -5"
                className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPointsModalOpen(false)}
                className="px-3 py-2 rounded-md border border-gray-600 text-xs text-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingPoints}
                className="px-4 py-2 rounded-md bg-primary text-secondary text-sm font-semibold disabled:opacity-60"
              >
                {savingPoints ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        )}
      </CustomModal>

      {/* Email modal */}
      <CustomModal
        isOpen={emailModalOpen}
        onOpenChange={(open) => {
          if (!open) setEmailModalOpen(false);
        }}
      >
        {selectedUser && (
          <form className="space-y-4" onSubmit={handleSendEmail}>
            <h3 className="text-lg font-semibold text-slate-100">
              Send email to {selectedUser.fullname}
            </h3>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Subject</label>
              <input
                type="text"
                value={emailForm.subject}
                onChange={(e) =>
                  setEmailForm((f) => ({ ...f, subject: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Message</label>
              <textarea
                rows={5}
                value={emailForm.message}
                onChange={(e) =>
                  setEmailForm((f) => ({ ...f, message: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-md bg-[#27272f] border border-[#3f3f46] text-sm outline-none focus:border-primary resize-y"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEmailModalOpen(false)}
                className="px-3 py-2 rounded-md border border-gray-600 text-xs text-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={sendingEmail}
                className="px-4 py-2 rounded-md bg-primary text-secondary text-sm font-semibold disabled:opacity-60"
              >
                {sendingEmail ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        )}
      </CustomModal>
    </div>
  );
}

export default Users;
