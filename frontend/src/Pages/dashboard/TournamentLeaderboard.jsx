import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export default function () {
  const { id } = useParams("id");
  const { data, refetch, isPending } = useFetch({
    url: `/api/tournaments/${id}`,
    key: `tournament@${id}`,
  });
  if (isPending) {
    return <div></div>;
  }
  return (
    <div className="w-full flex flex-col space-y-4">
      <h2 className="text-[32px] font-[700]">Leaderboard</h2>
      <div className="w-full">
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Rank</TableColumn>
            <TableColumn>User</TableColumn>
            <TableColumn>Wins</TableColumn>
            <TableColumn>losses</TableColumn>
            <TableColumn>points</TableColumn>
            <TableColumn>status</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No participant">
            {data?.participants
              .sort((a, b) => b.points - a.points)
              .map((d, i) => (
                <TableRow key={d._id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2 items-center">
                      <div className="w-[45px] h-[45px]">
                        <img
                          className="w-full h-full rounded-full"
                          src={d.user.profilePic}
                          alt=""
                        />
                      </div>
                      <p>{d.user.fullname}</p>
                    </div>
                  </TableCell>
                  <TableCell>{d.wins}</TableCell>
                  <TableCell>{d.losses}</TableCell>
                  <TableCell>{d.points}</TableCell>
                  <TableCell>
                    <div
                      className={`px-1 rounded-xl max-w-[max-content] ${
                        d.isEliminated ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      {d.isEliminated ? "eliminated" : "active"}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
