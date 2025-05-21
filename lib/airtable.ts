// lib/airtable.ts
export async function fetchAdviceLogs() {
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    }
  );

  const data = await res.json();

  return data.records.map((record: any) => ({
    id: record.id,
    role: record.fields.Role,
    skills: record.fields.Skills,
    advice: record.fields.Advice,
    timestamp: record.fields.Timestamp,
  }));
}
