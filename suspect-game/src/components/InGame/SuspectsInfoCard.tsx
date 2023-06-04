import {
  Avatar,
  Box,
  Dialog,
  Typography,
  Chip,
  Divider,
  Button,
  DialogActions,
} from "@mui/material";
import { Female } from "@mui/icons-material";
import { Male } from "@mui/icons-material";
import WorkIcon from "@mui/icons-material/Work";
import { SuspectType, VictimType } from "@/types";

interface SuspectsInfoCardProps {
  isOpen: boolean;
  victim: VictimType;
  suspects: SuspectType[];
  onClose: () => void;
}

export default function SuspectsInfoCard({
  isOpen,
  victim,
  suspects,
  onClose,
}: SuspectsInfoCardProps) {
  const genderIcon = (gender: "male" | "female") => {
    return gender === "male" ? <Male /> : <Female />;
  };

  return (
    <Dialog open={isOpen} maxWidth="lg">
      <Box display="flex">
        <Box
          sx={{
            padding: 3,
            width: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ width: 63, height: 63 }} src={victim.image} />
          <Chip size="small" label="피해자" color="default" sx={{ mt: 1 }} />

          <Box display="flex" mt={1}>
            <Typography>{victim.name}</Typography>
            <Typography>({victim.age})</Typography>
            {genderIcon(victim.gender)}
          </Box>

          <Box display="flex">
            <WorkIcon sx={{ color: "#a7abaf", width: "18px", mr: 1 }} />
            <Typography color="#a7abaf">{victim.job}</Typography>
          </Box>
          <Box
            px={2}
            my={4}
            color="#a7abaf"
            lineHeight={1.5}
            sx={{ wordBreak: "keep-all", wordSpacing: 1.2 }}
          >
            {victim.description}
          </Box>
        </Box>
        {suspects.map((suspect) => (
          <Box key={suspect.name}>
            <Divider orientation="vertical" flexItem variant="middle" />
            <Box
              key={suspect.name}
              sx={{
                padding: 3,
                width: 300,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ width: 63, height: 63 }} src={suspect.image} />
              <Chip
                label="용의자"
                color="error"
                size="small"
                variant="outlined"
                sx={{ mt: 1 }}
              />
              <Box display="flex" mt={1}>
                <Typography>{suspect.name}</Typography>
                <Typography>({suspect.age})</Typography>
                {genderIcon(suspect.gender)}
              </Box>
              <Box display="flex">
                <WorkIcon sx={{ color: "#a7abaf", width: "18px", mr: 1 }} />
                <Typography color="#a7abaf">{suspect.job}</Typography>
              </Box>
              <Box
                px={2}
                my={4}
                color="#a7abaf"
                lineHeight={1.5}
                sx={{ wordBreak: "keep-all", wordSpacing: 1.2 }}
              >
                {suspect.description}
              </Box>
              <Button
                sx={{ position: "absolute", bottom: 60 }}
                variant="outlined"
                color="error"
                onClick={() => {}}
              >
                당일 행적 진술
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}
