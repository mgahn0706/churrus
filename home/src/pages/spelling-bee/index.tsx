import { Box, TextField } from "@mui/material";
import { useState } from "react";

export default function SpellingBee() {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <Box>
      <h1>Spelling Bee</h1>
      <TextField value={input} onChange={handleInputChange} />
    </Box>
  );
}
