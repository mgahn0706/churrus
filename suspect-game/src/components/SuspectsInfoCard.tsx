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
import { SuspectType, VictimType } from "@/fixtures/startup/suspects";
import { useState } from "react";
import FinalConfirmModal from "./FinalConfirmModal";
import { useRouter } from "next/router";

interface SuspectsInfoCardProps {
  isAllClueSearched: boolean;
  isOpen: boolean;
  victim: VictimType;
  suspects: SuspectType[];
  onClose: () => void;
}

export default function SuspectsInfoCard({
  isOpen,
  isAllClueSearched,
  victim,
  suspects,
  onClose,
}: SuspectsInfoCardProps) {
  const genderIcon = (gender: "male" | "female") => {
    return gender === "male" ? <Male /> : <Female />;
  };

  const [accusedSuspect, setAccusedSuspect] = useState<SuspectType | null>(
    null
  );

  const router = useRouter();

  return (
    <>
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
            <Box mt={4} color="#a7abaf">
              {victim.description}
            </Box>
          </Box>
          {suspects.map((suspect) => (
            <>
              <Divider orientation="vertical" flexItem variant="middle" />
              <Box
                sx={{
                  padding: 3,
                  width: 300,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {" "}
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
                <Box my={4} color="#a7abaf">
                  {suspect.description}
                </Box>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setAccusedSuspect(suspect)}
                >
                  진범 지목
                </Button>
              </Box>
            </>
          ))}
        </Box>
        <DialogActions>
          <Button onClick={onClose}>닫기</Button>
        </DialogActions>
      </Dialog>
      <FinalConfirmModal
        isOpen={!!accusedSuspect}
        isAllClueSearched={isAllClueSearched}
        suspect={accusedSuspect}
        onConfirm={() => {
          localStorage.setItem("startup", accusedSuspect?.name ?? "");
          router.push("/startup/answer");
        }}
        onClose={() => {
          setAccusedSuspect(null);
        }}
      />
    </>
  );
}
