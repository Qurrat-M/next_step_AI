// pages/api/logAdvice.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { name, role, skills, aiAdvice } = req.body;

  if (!name || !role || !skills || !aiAdvice) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Name: name,
                Role: role,
                Skills: skills,
                Advice: aiAdvice,
                Timestamp: new Date().toISOString(),
              },
            },
          ],
        }),
      }
    );

    if (!response.ok) throw new Error("Airtable error");
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
