import { Session } from "../types";

export const exportSessionsToCSV = (sessions: Session[]): void => {
  // If no sessions, don't do anything
  if (sessions.length === 0) return;

  // Create header row
  let csvContent = "Date,Duration (seconds),";

  // Get all unique counter names across all sessions
  const allCounterNames = new Set<string>();
  sessions.forEach((session) => {
    session.counters.forEach((counter) => {
      allCounterNames.add(counter.name);
    });
  });

  // Add counter names to header
  csvContent += Array.from(allCounterNames).join(",") + "\n";

  // Add data rows
  sessions.forEach((session) => {
    // Add date and duration
    const date = new Date(session.timestamp).toLocaleString();
    csvContent += `"${date}",${session.duration},`;

    // Add counter values
    Array.from(allCounterNames).forEach((counterName) => {
      const counter = session.counters.find((c) => c.name === counterName);
      csvContent += (counter ? counter.count : 0) + ",";
    });

    csvContent = csvContent.slice(0, -1) + "\n"; // Remove last comma and add newline
  });

  // Create and download the file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `observation-sessions-${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
