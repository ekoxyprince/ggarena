import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/react";
import useFetch from "../../hooks/useFetch";

const TournamentMatches = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useFetch({
    key: `admin-tournament-matches-${id}`,
    url: `/api/tournaments/${id}/match`,
  });

  const rounds = data || [];

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-2xl font-semibold text-slate-100">
            Tournament matches
          </h2>
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-3 py-1.5 rounded-md border border-slate-700 text-xs text-slate-200"
        >
          Back
        </button>
      </div>

      <div className="space-y-6">
        {isLoading && (
          <p className="text-sm text-slate-400">Loading matches...</p>
        )}
        {!isLoading && rounds.length === 0 && (
          <p className="text-sm text-slate-400">
            No matches found for this tournament.
          </p>
        )}
        {rounds.map((round) => (
          <div
            key={round._id}
            className="w-full bg-[#020617] rounded-2xl p-4 border border-slate-800 shadow-sm overflow-x-auto space-y-3"
          >
            <h3 className="text-sm font-semibold text-slate-200 mb-2">
              Round {round._id}
            </h3>
            <Table aria-label={`Matches for round ${round._id}`}>
              <TableHeader>
                <TableColumn>MATCH ID</TableColumn>
                <TableColumn>PLAYER A</TableColumn>
                <TableColumn>PLAYER B</TableColumn>
                <TableColumn>SCORE</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody
                emptyContent="No matches in this round."
              >
                {round.matches?.map((m) => (
                  <TableRow key={m._id}>
                    <TableCell className="text-xs text-slate-400">
                      {m._id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 shrink-0">
                          {m.playerA?.profilePic ? (
                            <img
                              src={m.playerA.profilePic}
                              alt={m.playerA.fullname}
                              className="w-full h-full object-cover object-center"
                            />
                          ) : null}
                        </div>
                        <span className="text-sm text-slate-100">
                          {m.playerA?.fullname || "-"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 shrink-0">
                          {m.playerB?.profilePic ? (
                            <img
                              src={m.playerB.profilePic}
                              alt={m.playerB.fullname}
                              className="w-full h-full object-cover object-center"
                            />
                          ) : null}
                        </div>
                        <span className="text-sm text-slate-100">
                          {m.playerB?.fullname || "-"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {m.scoreA} - {m.scoreB}
                    </TableCell>
                    <TableCell className="capitalize">{m.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentMatches;
