import React from "react";
import TornamentCard from "./TornamentCard";
import CreateTournament from "./CreateTournament";
import Tors from "../../constants/Tors";
import TournamentModal from "./TournamentModal";
import { useGlobalContext } from "../../contexts/GlobalContext";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";

function CommunityTournament() {
  const { controlTournamentModal } = useGlobalContext();
  const { id } = useParams("id");
  const { data: tournaments } = useFetch({
    key: `${id}@community@tournament`,
    url: `/api/communities/${id}/tournament`,
  });
  const { data, isPending } = useFetch({
    url: `/api/communities/${id}`,
    key: `community@${id}`,
  });
  if (isPending) {
    return <div></div>;
  }
  return (
    <div className="w-full">
      <TournamentModal />
      <div>
        {data?.hasJoined && data?.isAdmin ? (
          <CreateTournament onPress={controlTournamentModal} />
        ) : (
          ""
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] mt-[35px]">
          {tournaments?.map((d, index) => {
            return <TornamentCard key={d._id} data={d} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default CommunityTournament;
