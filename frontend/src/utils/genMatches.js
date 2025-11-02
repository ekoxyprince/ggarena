const genMatches = (nTeams) => {
  let matchArray = [];

  while (nTeams > 1) {
    nTeams = (nTeams + 1) >> 1;
    let matches = [];
    for (let i = 0; i < nTeams; ++i) {
      const match = {
        id: i,
        date: new Date().toDateString(),
        teams: [
          { id: null, name: null },
          { id: null, name: null },
        ],
      };
      matches.push(match);
    }
    const roundTitle = matchArray.length + 1;
    matchArray.push({ title: `Round ${roundTitle}`, seeds: matches });
  }
  return matchArray;
};

export default genMatches;
