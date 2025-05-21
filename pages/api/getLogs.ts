// pages/api/getLogs.ts
export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    const logs = data?.records?.map((record: any) => ({
      id: record.id,
      name: record.fields.Name,
      role: record.fields.Role,
      skills: record.fields.Skills,
      advice: record.fields.Advice,
      timestamp: record.fields.Timestamp,
    }));

    res.status(200).json({ logs });
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
}
