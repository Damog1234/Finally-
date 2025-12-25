export default async function handler(req, res) {
  const { username } = req.query;
  const guildId = "1237055789441487021";
  if (!username) return res.status(400).json({ error: "Username required" });

  try {
    let foundPlayer = null;
    for (let page = 0; page < 50; page++) {
      const response = await fetch(`https://mee6.xyz/api/plugins/levels/leaderboard/${guildId}?page=${page}`);
      const data = await response.json();
      const player = data.players.find(p => p.username.toLowerCase() === username.toLowerCase());
      if (player) {
        foundPlayer = { ...player, rank: player.rank + 1 };
        break;
      }
      if (data.players.length < 100) break;
    }
    if (foundPlayer) res.status(200).json(foundPlayer);
    else res.status(404).json({ error: "Not found" });
  } catch (error) {
    res.status(500).json({ error: "Failed" });
  }
}
