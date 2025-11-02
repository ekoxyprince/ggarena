import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/react";
import useFetch from "../../hooks/useFetch";

function LeaderBoard() {
  const { data, refetch, isPending } = useFetch({
    url: `/api/user/leaderboards`,
    key: `leaderboard`,
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
            <TableColumn>Tournaments Won</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No participant">
            {data?.map((d, i) => (
              <TableRow key={d._id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <div className="flex space-x-2 items-center">
                    <div className="w-[45px] h-[45px]">
                      <img
                        className="w-full h-full rounded-full"
                        src={d.profilePic}
                        alt=""
                      />
                    </div>
                    <p>{d.fullname}</p>
                  </div>
                </TableCell>
                <TableCell>{d.tournamentsWon}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default LeaderBoard;
