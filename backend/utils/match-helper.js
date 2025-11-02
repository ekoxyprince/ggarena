import { BadrequestError } from "../http/exceptions/error.js";

class MatchHelper {
  shufflePlayers(data) {
    for (let i = data.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }
    return data;
  }
  groupPlayers(data, target = 2) {
    let newData = [];
    let group = [];
    let counter = 0;
    for (let i = 0; i <= data.length; i++) {
      group.push(data[i]);
      if (counter + 1 == target) {
        newData.push([...group]);
        counter = 0;
        group = [];
      } else {
        counter++;
      }
    }
    return newData;
  }
  arrangeGroupedPlayers(data, tournamentId, round, target = 2) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      obj["playerA"] = data[i].slice(0, target / 2)[0]?.user._id;
      obj["playerB"] = data[i].slice(target / 2)[0]?.user._id;
      obj["round"] = round;
      obj["tournament"] = tournamentId;
      newData.push(obj);
    }
    return newData;
  }
  isGroupable(length) {
    if (length <= 1) {
      return false;
    }
    return (length & (length - 1)) === 0;
  }
  pickWinner(data) {
    const { scoreA, scoreB } = data;
    if (scoreA > scoreB) {
      return { winner: data.playerA, hasWinner: true, loser: data.playerB };
    } else if (scoreA < scoreB) {
      return { winner: data.playerB, hasWinner: true, loser: data.playerA };
    } else {
      throw new BadrequestError("Every match must have a winner");
    }
  }
}

export default MatchHelper;
