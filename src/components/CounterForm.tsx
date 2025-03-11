import { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

interface CounterFormProps {
  onAdd: (name: string) => void;
}

export const CounterForm = ({ onAdd }: CounterFormProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 2, mb: 2 }}
    >
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Counter Name"
        variant="outlined"
        size="small"
        fullWidth
      />
      <Button type="submit" variant="contained" disabled={!name.trim()}>
        Add Counter
      </Button>
    </Box>
  );
};
