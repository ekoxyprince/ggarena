import {
  Bracket,
  Seed,
  SeedItem,
  SeedTeam,
  SingleLineSeed,
} from "react-brackets";
import { useState } from "react";
import genMatches from "../../utils/genMatches";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";

const CustomSeed = ({ seed, title, breakpoint, roundIndex, seedIndex }) => {
  const { id } = useParams("id");
  const { data, isPending } = useFetch({
    url: `/api/tournaments/${id}/match`,
    key: `tournament@${id}-match`,
  });
  const homeTeam = seed.teams[0];
  const awayTeam = seed.teams[1];
  console.log(seed.type);
  if (isPending || !data) {
    return <></>;
  }
  let homeScore = data[roundIndex]?.matches[seedIndex].scoreA || 0;
  let awayScore = data[roundIndex]?.matches[seedIndex].scoreB || 0;
  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem>
        <div>
          <SeedTeam
            style={{
              backgroundColor: homeScore > awayScore && "green",
            }}
            onClick={() => alert(seedIndex)}
          >
            <div>
              {data[roundIndex]?.matches[seedIndex].playerA.fullname ||
                "------"}
            </div>
            <div>{homeScore}</div>
          </SeedTeam>
          <SeedTeam
            style={{
              backgroundColor: homeScore < awayScore && "green",
            }}
          >
            <div>
              {data[roundIndex]?.matches[seedIndex].playerB.fullname ||
                "------"}
            </div>
            <div>{awayScore}</div>
          </SeedTeam>
        </div>
      </SeedItem>
      <div>{data[roundIndex]?.matches[seedIndex].status || "-----"}</div>
    </Seed>
  );
};
export default function () {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabIndexChange = (index) => () => {
    setTabIndex(index);
  };

  const handleSwipeChange = (index) => {
    setTabIndex(index);
  };
  const { id } = useParams("id");
  const { data, refetch, isPending } = useFetch({
    url: `/api/tournaments/${id}`,
    key: `tournament@${id}`,
  });

  if (isPending) {
    return <div></div>;
  }
  const rounds = genMatches(data?.totalParticipants || 0);
  return (
    <div className="w-full text-center">
      <Bracket
        rounds={rounds}
        renderSeedComponent={CustomSeed}
        swipeableProps={{
          enableMouseEvents: true,
          animateHeight: true,
          index: tabIndex,
          onChangeIndex: handleSwipeChange,
        }}
      />
    </div>
  );
}
