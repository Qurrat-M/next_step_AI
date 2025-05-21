"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function Dashboard() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/getLogs")
      .then((res) => res.json())
      .then((data) => setLogs(data.logs));
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        🧠 NextStep AI Career Mentor
      </h1>

      {/* 🎙️ Voice Button */}
      <div className="text-center my-6">
        <button
          onClick={() => window?.vapi?.startConversation()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-lg shadow"
        >
          🎤 Talk to Mentor
        </button>
      </div>

      {/* Logs */}
      {logs?.length === 0 ? (
        <p className="text-center text-gray-500">No logs yet.</p>
      ) : (
        <div className="space-y-4">
          {logs?.map((log, i) => (
            <div key={i} className="bg-white p-4 border rounded shadow">
              <div className="text-sm text-gray-500">
                {new Date(log.timestamp).toLocaleString()}
              </div>
              <div className="text-xl font-bold mt-1 text-indigo-700">
                {log.name}
              </div>
              <div>
                <strong>Role:</strong> {log.role}
              </div>
              <div>
                <strong>Skills:</strong> {log.skills}
              </div>
              <div className="mt-2 text-gray-700">
                <strong>Advice:</strong> <em>"{log.advice}"</em>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Vapi Embed Script */}
      <Script
        src="https://embed.vapi.ai/embed.js"
        onLoad={() => {
          window.vapi = window.vapi || {};
          window.vapi.init({
            apiKey: "your_public_vapi_embed_key_here",
            agentId: "your_agent_id_here",
          });
        }}
      />
    </main>
  );
}
