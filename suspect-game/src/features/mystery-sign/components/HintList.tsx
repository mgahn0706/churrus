import { Box, Typography, ListItem, List } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { DragHandle } from "@mui/icons-material";
import { HintType } from "../types";

interface HintListProps {
  hintList: HintType[];
}

export default function HintList({ hintList }: HintListProps) {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <List
        sx={{
          width: "90%",
          maxWidth: "1500px",
          bgcolor: "background.paper",
          display: "flex",
          flex: "0 300px",
          flexWrap: "wrap",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {hintList.map((hint, idx) => {
          return (
            <ListItem
              sx={{
                width: "48%",
                border: "1px solid lightgray",
                borderRadius: "15px",
                mb: 2,
                mr: 2,
              }}
              key={`hint-${idx}`}
            >
              <Typography
                textAlign="center"
                width="300px"
                fontSize={hint.first.length < 7 ? "30px" : "15px"}
              >
                {hint.first}
              </Typography>
              <HelpIcon sx={{ m: 2 }} />
              <Typography
                textAlign="center"
                width="300px"
                fontSize={hint.second.length < 7 ? "30px" : "15px"}
              >
                {hint.second}
              </Typography>
              <DragHandle sx={{ m: 2 }} />
              <Typography
                textAlign="center"
                width="300px"
                fontSize={
                  hint.result.length < 7
                    ? "30px"
                    : hint.result.length < 10
                    ? "15px"
                    : "12px"
                }
              >
                {hint.result}
              </Typography>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
