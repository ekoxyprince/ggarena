import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import formatNumber from "../../utils/formatNumber";
import StartTournament from "../../Components/ui/StartTournament";

export default function TournamentOverview() {
  const { id } = useParams("id");
  const { data, refetch, isPending } = useFetch({
    url: `/api/tournaments/${id}`,
    key: `tournament@${id}`,
  });

  if (isPending) {
    return <div></div>;
  }

  return (
    <div className="w-full flex flex-col gap-6 px-2 md:px-2 pb-12">
      {data?.isAdmin && <StartTournament />}

      <h2 className="text-2xl md:text-3xl font-bold text-primary">Overview</h2>

      <div className="w-full flex flex-wrap gap-6 p-4 md:p-6 bg-[#2e2e2e] rounded-lg shadow-md border-l-4 border-primary">
        <InfoItem label="Game" value={data?.game.name} />
        <InfoItem label="Mode" value={data?.mode} />
        <InfoItem label="Participants" value={data?.participants.length} />
        <InfoItem
          label="Prize Pool"
          value={`${data?.currency} ${formatNumber(data?.price)
            .replace(".0", "")
            .toUpperCase()}`}
        />
        <InfoItem
          label="Date"
          value={new Date(data?.createdAt).toDateString()}
        />
      </div>

      <SectionBlock title="Overview" content={data?.overview} />

      <SectionBlock title="Rules and Regulations" content={data?.rules} />
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="flex flex-col min-w-[140px] flex-1 sm:flex-none">
      <p className="text-xs md:text-sm font-semibold text-gray-400">{label}</p>
      <h2 className="text-sm md:text-base font-bold text-white break-words">
        {value}
      </h2>
    </div>
  );
}

function SectionBlock({ title, content }) {
  return (
    <div className="w-full bg-[#2e2e2e] border-l-4 border-primary rounded-lg p-4 md:p-6 space-y-2 leading-relaxed shadow-md">
      <h2 className="text-base md:text-lg font-semibold text-primary">
        {title}
      </h2>
      <p className="text-sm md:text-base font-normal text-white whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
}
