export default async function handler(req, res) {
  const guildId = "1237055789441487021";
  try {
    const response = await fetch(`https://mee6.xyz/api/plugins/levels/leaderboard/${guildId}?limit=10`);
    const data = await response.json();
    const topTen = data.players.map(p => ({ ...p, rank: p.rank + 1 }));
    res.status(200).json(topTen);
  } catch (error) {
    res.status(500).json({ error: "Failed" });
  }
}
