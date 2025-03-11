import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";
import { TimerStatus, TimerSettings } from "../types";

interface TimerProps {
  settings: TimerSettings;
  onSettingsChange: (settings: TimerSettings) => void;
  onStatusChange: (status: TimerStatus) => void;
  status: TimerStatus;
}

export const Timer = ({
  settings,
  onSettingsChange,
  onStatusChange,
  status,
}: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(0);

  const updateTimer = useCallback(() => {
    if (status !== "idle") {
      const duration =
        status === "recording" ? settings.recordTime : settings.restTime;
      if (timeLeft === 0) {
        setTimeLeft(duration);
      }
    }
  }, [status, settings, timeLeft]);

  useEffect(() => {
    updateTimer();
    let interval: number;

    if (status !== "idle") {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (status === "recording") {
              onStatusChange("resting");
              return settings.restTime;
            } else {
              onStatusChange("idle");
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status, settings, onStatusChange, updateTimer]);

  useEffect(() => {
    const duration =
      status === "recording" ? settings.recordTime : settings.restTime;
    setProgress((timeLeft / duration) * 100);
  }, [timeLeft, status, settings]);

  const handleStart = () => {
    onStatusChange("recording");
    setTimeLeft(settings.recordTime);
  };

  const handleStop = () => {
    onStatusChange("idle");
    setTimeLeft(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          type="number"
          label="Record Time (seconds)"
          value={settings.recordTime}
          onChange={(e) =>
            onSettingsChange({
              ...settings,
              recordTime: Math.max(1, parseInt(e.target.value) || 0),
            })
          }
          disabled={status !== "idle"}
          size="small"
        />
        <TextField
          type="number"
          label="Rest Time (seconds)"
          value={settings.restTime}
          onChange={(e) =>
            onSettingsChange({
              ...settings,
              restTime: Math.max(1, parseInt(e.target.value) || 0),
            })
          }
          disabled={status !== "idle"}
          size="small"
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h6"
          color={status === "recording" ? "error" : "primary"}
        >
          {status === "idle"
            ? "Ready"
            : status === "recording"
            ? "Recording"
            : "Resting"}
        </Typography>
        <Typography variant="h4">{formatTime(timeLeft)}</Typography>
        {status !== "idle" && (
          <LinearProgress
            variant="determinate"
            value={progress}
            color={status === "recording" ? "error" : "primary"}
            sx={{ mt: 1 }}
          />
        )}
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color={status === "recording" ? "error" : "primary"}
          onClick={status === "idle" ? handleStart : handleStop}
        >
          {status === "idle" ? "Start Timer" : "Stop Timer"}
        </Button>
      </Box>
    </Box>
  );
};
