"use client";
import { useEffect, useState } from "react";

import { DATASET_LOGS } from "@/lib/dataset";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type LogRecord = {
  IDENT: string;
  PROBLEM: string;
  ACTION: string;
};

export function LogAnalyzer() {
  const [logs, setLogs] = useState<LogRecord[]>([]);
  const [logText, setLogText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    setLogs(DATASET_LOGS);
  }, []);

  async function handleAnalyze() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const resp = await fetch(`${API_BASE}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ log_text: logText }),
      });
      if (!resp.ok) throw new Error("Failed to analyze log");
      const data = await resp.json();
      setResult(data.summary);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-2 text-xs text-muted-foreground">
        This table shows real aircraft maintenance logs from the MaintNet
        dataset. Click a row to select a log for analysis.
      </div>
      <div className="max-h-60 overflow-auto border rounded mb-3">
        <table className="w-full text-xs min-w-[600px] text-xs">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="py-1 px-2 text-left">#</th>
              <th className="py-1 px-2 text-left">IDENT</th>
              <th className="py-1 px-2 text-left">PROBLEM</th>
              <th className="py-1 px-2 text-left">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr
                key={i}
                className={
                  "cursor-pointer hover:bg-primary/10 " +
                  (logText.includes(log.PROBLEM) && logText.includes(log.ACTION)
                    ? "bg-primary/20"
                    : "")
                }
                onClick={() =>
                  setLogText(
                    `IDENT: ${log.IDENT}\nPROBLEM: ${log.PROBLEM}\nACTION: ${log.ACTION}`
                  )
                }
              >
                <td className="py-1 px-2 truncate max-w-[160px]">{i + 1}</td>
                <td className="py-1 px-2 truncate max-w-[160px]">
                  {log.IDENT}
                </td>
                <td className="ppy-1 px-2 truncate max-w-[160px]">
                  {log.PROBLEM.slice(0, 60)}
                </td>
                <td className="py-1 px-2 truncate max-w-[160px]">
                  {log.ACTION.slice(0, 60)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <textarea
        className="w-full border rounded p-2 mb-2 text-sm"
        rows={6}
        value={logText}
        onChange={(e) => setLogText(e.target.value)}
        placeholder="Select a log above or paste log here..."
      />
      <Button
        onClick={handleAnalyze}
        disabled={loading || !logText}
        className="mb-4"
      >
        {loading ? "Analyzing..." : "Analyze Log"}
      </Button>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {result && (
        <div className="mt-4 border rounded p-3 bg-gray-50">
          <strong>Summary:</strong>
          <pre className="whitespace-pre-wrap text-sm">{result}</pre>
        </div>
      )}
    </div>
  );
}
