import React from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { GrCompliance } from "react-icons/gr";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import useMutate from "../../hooks/useMutate";

function TournamentFixtures() {
  const { id } = useParams("id");
  const {
    data: matches,
    isPending: isPendingMatches,
    refetch,
  } = useFetch({
    url: `/api/tournaments/${id}/match`,
    key: `tournament@${id}-match`,
  });
  const [form, setForm] = React.useState({
    _id: "",
    scoreA: 0,
    scoreB: 0,
    tournament: "",
  });
  const [visible, setVisible] = React.useState(false);
  const { mutateAsync: updateMatch } = useMutate(
    `/api/tournaments/${form.tournament}/match/${form._id}`,
    [`update@${form._id}`],
    "patch"
  );
  const { mutateAsync: endMatch } = useMutate(
    `/api/tournaments/${form.tournament}/match/${form._id}`,
    [`end@${form._id}-match`],
    "post"
  );
  const { mutateAsync: endRound } = useMutate(
    `/api/tournaments/${id}/match`,
    [`end@${id}-round`],
    "post"
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  async function handleSubmit(onClose) {
    console.log("submitted", form);
    const { _id, tournament, ...body } = form;
    await updateMatch(body, {
      onSettled: (data) => {
        onClose();
        if (data) {
          refetch();
        }
      },
    });
  }
  async function handleEndMatch() {
    await endMatch(
      {},
      {
        onSettled: (data) => {
          setVisible(false);
          if (data) {
            refetch();
          }
        },
      }
    );
  }
  async function handleEndRound(round) {
    await endRound(
      { round },
      {
        onSettled: (data) => {
          if (data) {
            refetch();
          }
        },
      }
    );
  }
  return (
    <div className="min-h-screen bg-transparent px-4 sm:px-8 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-primary">
        Tournament Fixtures
      </h1>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Match
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-[15px]">
                  <div className="flex space-x-2 items-center">
                    <input
                      type="text"
                      placeholder="0"
                      className="w-full bg-[#292929] border-t-[2px] border-b-[2px] border-[#474747] h-[45px] outline-0 px-[20px] font-syne"
                      value={form.scoreA}
                      onChange={(e) => {
                        const { value } = e.target;
                        setForm((prev) => ({ ...prev, scoreA: value }));
                      }}
                    />
                    <p className="text-[40px] font-bold">:</p>
                    <input
                      type="text"
                      placeholder="0"
                      className="w-full bg-[#292929] border-t-[2px] border-b-[2px] border-[#474747] h-[45px] outline-0 px-[20px] font-syne"
                      value={form.scoreB}
                      onChange={(e) => {
                        const { value } = e.target;
                        setForm((prev) => ({ ...prev, scoreB: value }));
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-[13px] px-[20px] bg-primary text-secondary text-[15px] font-bold font-Mont mt-[30px] relative"
                    onClick={handleSubmit.bind(this, onClose)}
                  >
                    Edit
                  </button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      {visible && (
        <div className="fixed w-full h-full flex items-center justify-center z-20 bg-[rgba(0,0,0,0.15)] top-0 bottom-0 left-0 right-0 backdrop-blur-sm duration-200 ease-linear">
          <div
            className="w-full h-full z-30 fixed top-0 bottom-0 left-0 right-0"
            onClick={() => setVisible(false)}
          ></div>
          <div className="w-96 bg-background rounded-lg shadow-xl p-6 text-center z-40">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              End Match Confirmation
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to end this match? This action cannot be
              undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleEndMatch}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                End Match
              </button>
              <button
                onClick={() => setVisible(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {matches?.map((round) => (
        <div key={round._id} className="mb-10">
          <div className="mt-4 flex justify-between mb-2">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-primary">
              Round {round._id + 1}
            </h2>

            <button
              onClick={handleEndRound.bind(this, round._id)}
              className="bg-primary text-background font-semibold px-4 py-2 rounded hover:opacity-90 transition"
            >
              End Round
            </button>
          </div>

          <div className="space-y-4">
            {round.matches.map((match) => (
              <div
                key={match._id}
                className="relative bg-[#2e2e2e] rounded-lg shadow-md p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-6"
              >
                {match.status == "scheduled" && (
                  <button
                    className="absolute top-1 right-1 text-white hover:text-primary text-xl"
                    onClick={() => {
                      console.log("Edit", match._id);
                      setForm((prev) => ({
                        _id: match._id,
                        tournament: match.tournament,
                        scoreA: match.scoreA,
                        scoreB: match.scoreB,
                      }));
                      onOpen();
                    }}
                    title="Edit Match"
                  >
                    <CiEdit />
                  </button>
                )}

                {match.status == "scheduled" && (
                  <button
                    className="absolute bottom-1 right-1 text-white hover:text-red-400 text-xl"
                    onClick={async () => {
                      console.log("End", match._id);
                      setForm((prev) => ({
                        _id: match._id,
                        tournament: match.tournament,
                        scoreA: match.scoreA,
                        scoreB: match.scoreB,
                      }));
                      setVisible(true);
                    }}
                    title="End Match"
                  >
                    <GrCompliance />
                  </button>
                )}

                <div className="flex items-center space-x-4 sm:flex-1">
                  <img
                    src={match.playerA.profilePic}
                    alt={match.playerA.fullname}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-white font-medium text-sm sm:text-base">
                    {match.playerA.fullname}
                  </span>
                  <span className="text-2xl font-bold text-primary ml-4">
                    {match.scoreA}
                  </span>
                </div>

                <div className="text-primary font-bold text-center text-sm sm:text-base">
                  VS
                </div>

                <div className="flex items-center space-x-4 sm:flex-1 sm:justify-end">
                  <span className="text-2xl font-bold text-primary mr-4">
                    {match.scoreB}
                  </span>
                  <span className="text-white font-medium text-sm sm:text-base">
                    {match.playerB.fullname}
                  </span>
                  <img
                    src={match.playerB.profilePic}
                    alt={match.playerB.fullname}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>

                <div className="text-right sm:text-left sm:flex-1">
                  <span
                    className={`text-xs sm:text-sm font-semibold ${
                      match.status === "ended"
                        ? "text-red-400"
                        : "text-yellow-300"
                    }`}
                  >
                    {match.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TournamentFixtures;
