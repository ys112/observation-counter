export interface Counter {
  id: string;
  name: string;
  count: number;
}

export interface TimerSettings {
  recordTime: number; // in seconds
  restTime: number; // in seconds
}

export interface Session {
  id: string;
  timestamp: string;
  counters: Counter[];
  duration: number; // in seconds
}

export type TimerStatus = "idle" | "recording" | "resting";
