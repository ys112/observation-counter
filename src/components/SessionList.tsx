import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Session } from "../types";

interface SessionListProps {
  sessions: Session[];
}

export const SessionList = ({ sessions }: SessionListProps) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (sessions.length === 0) {
    return <Typography>No sessions recorded yet</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Observations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell>{formatDate(session.timestamp)}</TableCell>
              <TableCell>{formatDuration(session.duration)}</TableCell>
              <TableCell>
                {session.counters.map((counter) => (
                  <div key={counter.id}>
                    {counter.name}: {counter.count}
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
