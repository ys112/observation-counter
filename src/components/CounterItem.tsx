import { Paper, Typography, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { Counter } from "../types";

interface CounterItemProps {
  counter: Counter;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  disabled?: boolean;
}

export const CounterItem = ({
  counter,
  onIncrement,
  onDecrement,
  onRemove,
  disabled,
}: CounterItemProps) => {
  const isRecording = disabled === false; // When recording, disabled is false for increment/decrement

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h6">{counter.name}</Typography>
          <Typography variant="h4">{counter.count}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          {!isRecording && (
            <IconButton
              onClick={() => onRemove(counter.id)}
              color="error"
              size="medium"
              aria-label="remove counter"
              sx={{ alignSelf: "flex-start" }}
              title="Remove counter"
            >
              <DeleteIcon />
            </IconButton>
          )}
          <IconButton
            onClick={() => onDecrement(counter.id)}
            disabled={disabled || counter.count <= 0}
            size="large"
            color="error"
            sx={{ p: 2 }}
            aria-label="decrement counter"
          >
            <RemoveIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={() => onIncrement(counter.id)}
            disabled={disabled}
            size="large"
            color="primary"
            sx={{ p: 2 }}
            aria-label="increment counter"
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};
