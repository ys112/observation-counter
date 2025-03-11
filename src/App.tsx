import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Divider,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Counter, Session, TimerSettings, TimerStatus } from "./types";
import { CounterForm } from "./components/CounterForm";
import { CounterItem } from "./components/CounterItem";
import { Timer } from "./components/Timer";
import { SessionList } from "./components/SessionList";
import { exportSessionsToCSV } from "./utils/csvExport";
import "./App.css";

const DEFAULT_TIMER_SETTINGS: TimerSettings = {
  recordTime: 60, // 1 minute
  restTime: 120, // 2 minutes
};

// localStorage keys for better consistency
const STORAGE_KEYS = {
  SESSIONS: "observation-counter-sessions",
  COUNTERS: "observation-counter-counters",
  SETTINGS: "observation-counter-settings",
};

// Helper to check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const test = "test";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

export default function App() {
  const [counters, setCounters] = useState<Counter[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [timerSettings, setTimerSettings] = useState<TimerSettings>(
    DEFAULT_TIMER_SETTINGS
  );
  const [timerStatus, setTimerStatus] = useState<TimerStatus>("idle");
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [localStorageAvailable, setLocalStorageAvailable] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Check localStorage availability
  useEffect(() => {
    const available = isLocalStorageAvailable();
    setLocalStorageAvailable(available);

    if (!available) {
      setStorageError(
        "LocalStorage is not available. Your data won't be saved between sessions."
      );
    }
  }, []);

  // Load data from localStorage on mount
  useEffect(() => {
    if (!localStorageAvailable) return;

    try {
      // Load sessions
      const savedSessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      if (savedSessions) {
        setSessions(JSON.parse(savedSessions));
      }

      // Load counters
      const savedCounters = localStorage.getItem(STORAGE_KEYS.COUNTERS);
      if (savedCounters) {
        setCounters(JSON.parse(savedCounters));
      }

      // Load timer settings
      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (savedSettings) {
        setTimerSettings(JSON.parse(savedSettings));
      }

      // Mark initial loading as complete
      setIsInitialLoad(false);
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      setStorageError("Failed to load data from local storage");
      setIsInitialLoad(false); // Still mark as complete even if there's an error
    }
  }, [localStorageAvailable]);

  // Save sessions to localStorage when updated
  useEffect(() => {
    if (!localStorageAvailable || isInitialLoad) return;

    try {
      // Add console logging for debugging
      console.log("Saving sessions to localStorage:", sessions);
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    } catch (error) {
      console.error("Error saving sessions to localStorage:", error);
      setStorageError("Failed to save sessions to local storage");
    }
  }, [sessions, localStorageAvailable, isInitialLoad]);

  // Save counters to localStorage when updated
  useEffect(() => {
    if (!localStorageAvailable || isInitialLoad) return;

    try {
      // Add console logging for debugging
      console.log("Saving counters to localStorage:", counters);
      localStorage.setItem(STORAGE_KEYS.COUNTERS, JSON.stringify(counters));
    } catch (error) {
      console.error("Error saving counters to localStorage:", error);
      setStorageError("Failed to save counters to local storage");
    }
  }, [counters, localStorageAvailable, isInitialLoad]);

  // Save timer settings to localStorage when updated
  useEffect(() => {
    if (!localStorageAvailable || isInitialLoad) return;

    try {
      localStorage.setItem(
        STORAGE_KEYS.SETTINGS,
        JSON.stringify(timerSettings)
      );
    } catch (error) {
      console.error("Error saving timer settings to localStorage:", error);
      setStorageError("Failed to save timer settings to local storage");
    }
  }, [timerSettings, localStorageAvailable, isInitialLoad]);

  const handleAddCounter = (name: string) => {
    setCounters((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        count: 0,
      },
    ]);
  };

  const handleIncrement = (id: string) => {
    setCounters((prev) =>
      prev.map((counter) =>
        counter.id === id ? { ...counter, count: counter.count + 1 } : counter
      )
    );
  };

  const handleDecrement = (id: string) => {
    setCounters((prev) =>
      prev.map((counter) =>
        counter.id === id && counter.count > 0
          ? { ...counter, count: counter.count - 1 }
          : counter
      )
    );
  };

  const handleRemoveCounter = (id: string) => {
    setCounters((prev) => prev.filter((counter) => counter.id !== id));
  };

  const handleTimerStatusChange = (status: TimerStatus) => {
    setTimerStatus(status);
    if (status === "recording" && !sessionStartTime) {
      setSessionStartTime(new Date());
    } else if (status === "idle") {
      // Just stop the timer without saving
      // Session saving is now manual with the Save Session button
    }
  };

  const handleSaveSession = () => {
    if (
      counters.length === 0 ||
      counters.every((counter) => counter.count === 0)
    ) {
      alert("No observations to save! Please record at least one count.");
      return;
    }

    const duration = sessionStartTime
      ? Math.round((Date.now() - sessionStartTime.getTime()) / 1000)
      : 0;

    // Create new session object
    const newSession: Session = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      counters: JSON.parse(JSON.stringify(counters)), // Deep clone to ensure no reference issues
      duration,
    };

    // Update sessions using functional update to ensure we're working with the latest state
    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);

    // Directly save to localStorage as an additional precaution
    try {
      localStorage.setItem(
        STORAGE_KEYS.SESSIONS,
        JSON.stringify(updatedSessions)
      );
    } catch (error) {
      console.error("Error directly saving session to localStorage:", error);
    }

    // Reset counters count but don't remove them
    const resetCounters = counters.map((counter) => ({ ...counter, count: 0 }));
    setCounters(resetCounters);

    // Directly save counters to localStorage as an additional precaution
    try {
      localStorage.setItem(
        STORAGE_KEYS.COUNTERS,
        JSON.stringify(resetCounters)
      );
    } catch (error) {
      console.error("Error directly saving counters to localStorage:", error);
    }

    setSessionStartTime(null);
  };

  const handleExportCSV = () => {
    exportSessionsToCSV(sessions);
  };

  const handleCloseError = () => {
    setStorageError(null);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Snackbar
        open={!!storageError}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {storageError}
        </Alert>
      </Snackbar>

      <Typography variant="h4" component="h1" gutterBottom>
        Observation Counter
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Timer
          settings={timerSettings}
          onSettingsChange={setTimerSettings}
          status={timerStatus}
          onStatusChange={handleTimerStatusChange}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Counters
        </Typography>
        <CounterForm onAdd={handleAddCounter} />
        {counters.map((counter) => (
          <CounterItem
            key={counter.id}
            counter={counter}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={handleRemoveCounter}
            disabled={timerStatus !== "recording"}
          />
        ))}
      </Box>

      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<SaveIcon />}
          onClick={handleSaveSession}
        >
          Save Session
        </Button>
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          onClick={handleExportCSV}
          disabled={sessions.length === 0}
        >
          Export CSV
        </Button>
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h5" gutterBottom>
          Previous Sessions
        </Typography>
        <SessionList sessions={sessions} />
      </Box>
    </Container>
  );
}
